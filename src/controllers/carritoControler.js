const carritoController = {};
const pool = require('../baseDeDatos');

carritoController.all = (req, res) => {
    var session = req.session.user;
    
    pool.query("SELECT * FROM carrito, producto WHERE carrito.idProducto = producto.idProducto AND carrito.idUsuario = ?", [session.iduser], (err, carrito) => {
        if (err) {
            console.log(err);
        }
        console.log(carrito);
        res.render('carrito', { session: session, data: carrito });
    });
}

carritoController.add = (req, res) => {
    var session = req.session.user;
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
    var session = req.session.user;
    let producto = req.params.idproducto;

    pool.query("SELECT count(*) FROM carrito WHERE idUsuario = ? AND idProducto = ?", [session.iduser, producto], (err, controlCarrito) => {
        if (err) {
            console.log(err);
        }
        console.log(controlCarrito);
        if (controlCarrito[0]['count(*)'] == 0) {
            res.redirect('/carrito');
        } else {
            //agregamos al carrito y lo agregamos
            pool.query("DELETE FROM `carrito` WHERE idUsuario = ? AND idProducto = ?", [session.iduser, producto], (err, agregarACarrito) => {
                if (err) {
                    console.log(err);
                }
                res.redirect('/carrito');
            })
        }
    });
};

module.exports = carritoController;