const carritoController = {};
const pool = require('../baseDeDatos');

carritoController.all = (req, res) => {
    var session = {
        "nombre": req.session.name,
        "tipo": req.session.tipo,
        "iduser": req.session.iduser
    };

    pool.query("SELECT * FROM carrito, producto WHERE carrito.idProducto = producto.idProducto AND carrito.idUsuario = ?", [req.session.iduser], (err, carrito) => {
        if (err) {
            console.log(err);
        }
        console.log(carrito);
        res.render('carrito', { session: session, data: carrito });
    });
}

carritoController.add = (req, res) => {
    var session = {
        "nombre": req.session.name,
        "tipo": req.session.tipo,
        "iduser": req.session.iduser
    };
    let producto = req.params.idproducto;

    //evaluamos si hay una session iniciada en caso contrario los redireccionamos al inicio
    if (session.nombre == "none") {
        res.redirect('/');
    } else {
        pool.query("SELECT count(*) FROM carrito WHERE idUsuario = ? AND idProducto = ?", [session.iduser, producto], (err, controlCarrito) => {
            if (err) {
                console.log(err);
            }
            console.log(controlCarrito);
            if (controlCarrito[0]['count(*)'] == 1) {
                res.redirect('/carrito');
            } else {
                //agregamos al carrito y lo agregamos
                pool.query("INSERT INTO carrito(`idUsuario`, `idProducto`, `cantidad`) VALUES (?,?,'1')", [session.iduser, producto], (err, agregarACarrito) => {
                    if (err) {
                        console.log(err);
                    }
                    res.redirect('/carrito');
                })
            }
        });
    }
};

carritoController.remove = (req, res) => {
    var session = {
        "nombre": req.session.name,
        "tipo": req.session.tipo,
        "iduser": req.session.iduser
    };
    let producto = req.params.idproducto;

    req.getConnection((err, conn) => {
        conn.query("SELECT count(*) FROM carrito WHERE idUsuario = ? AND idProducto = ?", [session.iduser, producto], (err, controlCarrito) => {
            if (err) {
                console.log(err);
            }
            console.log(controlCarrito);
            if (controlCarrito[0]['count(*)'] == 0) {
                res.redirect('/carrito');
            } else {
                //agregamos al carrito y lo agregamos
                conn.query("DELETE FROM `carrito` WHERE idUsuario = ? AND idProducto = ?", [session.iduser, producto], (err, agregarACarrito) => {
                    if (err) {
                        console.log(err);
                    }
                    res.redirect('/carrito');
                })
            }
        });
    })
};

module.exports = carritoController;