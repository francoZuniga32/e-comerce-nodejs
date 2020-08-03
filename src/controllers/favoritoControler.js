const favoritosControlador = {};
const POOL = require('../baseDeDatos');

favoritosControlador.render = (req, res) => {
    var session = req.session.user;
    var consulta = "SELECT * FROM favoritos , producto WHERE producto.idProducto = favoritos.idProducto AND favoritos.idUsuario = ?";

    POOL.query(consulta, [session.iduser], (err, favoritos) => {
        console.log(favoritos);
        res.render('favoritos', { session: session, data: favoritos });
    });
};

favoritosControlador.agregar = (req, res) => {
    var session = req.session.user;
    var idproducto = req.body.idproducto;
    var puntos = req.body.puntos;
    var consultaExistencia = "SELECT count(*) FROM favoritos WHERE favoritos.idUsuario = ? AND favoritos.idProducto = ?";
    var consulta = "INSERT INTO `favoritos`(`idUsuario`, `idProducto`, `puntos`) VALUES (?,?,?)";

    POOL.query(consultaExistencia, [session.iduser, idproducto], (err, favoritos) => {
        console.log(favoritos);
        if (favoritos[0]['count(*)'] > 0) {
            res.redirect('/favoritos');
        } else {
            POOL.query(consulta, [session.iduser, idproducto, puntos], (err, favoritos) => {
                if (err) {
                    console.log(err);
                }
                res.redirect('/favoritos');
            });
        }
    });
};

favoritosControlador.eliminar = (req, res) => {
    var session = req.session.user;
    var idproducto = req.params.idproducto;
    var consultaExistencia = "SELECT count(*) FROM favoritos WHERE favoritos.idUsuario = ? AND favoritos.idProducto = ?";
    var consulta = "DELETE FROM `favoritos` WHERE  favoritos.idUsuario = ? AND favoritos.idProducto = ?";

    POOL.query(consultaExistencia, [session.iduser, idproducto], (err, favoritos) => {
        if(err){
            console.log(err);
        }
        console.log(favoritos);
        if (favoritos[0]['count(*)'] > 0) {
            POOL.query(consulta, [session.iduser, idproducto], (err, favoritos) => {
                if (err) {
                    console.log(err);
                }
                console.log(favoritos);
                res.send("1");
            });
        } else {
            res.redirect("0");
        }
    });
};

module.exports = favoritosControlador;