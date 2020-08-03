const carritoControlador = {};
const POOL = require('../baseDeDatos');
const { end } = require('../baseDeDatos');

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
    var consultaExistencia =  "SELECT count(*) FROM carrito WHERE idUsuario = ? AND idProducto = ?";
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

carritoControlador.incrementar = (req, res)=>{
    var session = req.session.user;
    var idproducto = req.body.idprducto;
    var cantidad = req.body.cantidad;
    var consultaIncremento = "UPDATE `carrito` SET `cantidad`= ?  WHERE idUsuario = ? AND idProducto = ?";

    console.log(idproducto, session, cantidad);

    POOL.query(consultaIncremento ,[cantidad, session.iduser, idproducto], (err, carrito)=>{
        if(err){
            console.log(err);
        }
        res.status(200).end();
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