const carritoControlador = {};
const POOL = require('../baseDeDatos');

const mercadoPago = require('mercadopago');
const session = require('express-session');
const CONFIG_MERCADO_PAGO = require('../config.json').mercadopago;

mercadoPago.configure({
    sandbox: true,
    access_token: CONFIG_MERCADO_PAGO.token,
    client_id: CONFIG_MERCADO_PAGO.client_id,
    client_secret: CONFIG_MERCADO_PAGO.client_secret
});


carritoControlador.all = (req, res) => {
    var session = req.session.user;
    var consulta = "SELECT * FROM carrito, producto WHERE carrito.idProducto = producto.idProducto AND carrito.idUsuario = ?";

    POOL.query(consulta, [session.iduser], (err, carrito) => {
        if (err) {
            console.log(err);
        }

        carrito.forEach(element => {
            element.total = parseFloat(formatPrecio(element.precio * element.cantidad));
        });

        console.log(carrito);
        res.render('carrito', { session: session, data: carrito });
    });
}

carritoControlador.add = (req, res) => {
    var session = req.session.user;
    var producto = req.params.idproducto;
    var consultaExistencia = "SELECT count(*) FROM carrito WHERE idUsuario = ? AND idProducto = ?";
    var consultaCarrito = "INSERT INTO carrito(`idUsuario`, `idProducto`, `cantidad`) VALUES (?,?,'1')";

    //evaluamos si hay una session iniciada en caso contrario los redireccionamos al inicio
    if (session.nombre == "none") {
        res.redirect('/');
    } else {
        POOL.query(consultaExistencia, [session.iduser, producto], (err, controlCarrito) => {
            if (err) {
                console.log(err);
            }
            console.log(controlCarrito);
            if (controlCarrito[0]['count(*)'] == 1) {
                res.redirect('/carrito');
            } else {
                //agregamos al carrito y lo agregamos
                POOL.query(consultaCarrito, [session.iduser, producto], (err, agregarACarrito) => {
                    if (err) {
                        console.log(err);
                    }
                    res.redirect('/carrito');
                })
            }
        });
    }
};

carritoControlador.remove = (req, res) => {
    var session = req.session.user;
    var producto = req.body.idproducto;
    var consultaExistencia = "SELECT count(*) FROM carrito WHERE idUsuario = ? AND idProducto = ?";
    var consultaCarrito = "DELETE FROM `carrito` WHERE idUsuario = ? AND idProducto = ?";

    POOL.query(consultaExistencia, [session.iduser, producto], (err, controlCarrito) => {
        if (err) {
            console.log(err);
        }
        console.log(controlCarrito);
        if (controlCarrito[0]['count(*)'] == 0) {
            res.redirect('/carrito');
        } else {
            //agregamos al carrito y lo agregamos
            POOL.query(consultaCarrito, [session.iduser, producto], (err, agregarACarrito) => {
                if (err) {
                    console.log(err);
                }
                res.redirect('/carrito');
            })
        }
    });
};

carritoControlador.incrementar = (req, res) => {
    var session = req.session.user;
    var idproducto = req.body.idprducto;
    var cantidad = req.body.cantidad;
    var consultaIncremento = "UPDATE `carrito` SET `cantidad`= ?  WHERE idUsuario = ? AND idProducto = ?";

    console.log(idproducto, session, cantidad);

    POOL.query(consultaIncremento, [cantidad, session.iduser, idproducto], (err, carrito) => {
        if (err) {
            console.log(err);
        }
        res.status(200).end();
    });
};

carritoControlador.comprar = async (req, res) => {
    var idusuario = req.session.user.iduser;
    var consultaCompra = "SELECT * FROM carrito, producto WHERE carrito.idProducto = producto.idProducto AND carrito.idUsuario = ?";
    var preference = {
        items: [],
        back_urls: {
            "success": "http://localhost:3000/compra/success",
            "failure": "http://localhost:3000/compra/failure",
            "pending": "http://localhost:3000/compra/pending"
        },
        shipments: {
            "mode": "custom"
        },
        auto_return: "approved"
    };

    var producto = await POOL.query(consultaCompra, [idusuario]);
    producto.forEach(element => {
        var nombre = element.nombre;
        var cantidad = element.cantidad;
        var precio = element.precio;

        preference.items.push({
            title: nombre,
            quantity: cantidad,
            currency_id: 'ARS',
            unit_price: precio
        });
    });

    mercadoPago.preferences.create(preference).then(function (mpResponse) {
        console.log(mpResponse);
        res.redirect(mpResponse.body.init_point);
    });
};


function formatPrecio(numero) {
    var n = (numero + "").split(".");
    var entero = '0';
    var decimal = '00';
    if (n.length >= 2) {
        entero = n[0];
        decimal = primerosDosNumeros(n[1]);
    }
    else if (n.length >= 1) {
        entero = n[0];
    }
    return entero + "." + decimal;
}
function primerosDosNumeros(numero) {
    if (numero.length >= 2) {
        numero = numero.substring(0, 2);
    }
    else if (numero.length == 1) {
        numero = "0" + numero;
    }
    else {
        numero = '00';
    }
    return numero;
}


module.exports = carritoControlador;