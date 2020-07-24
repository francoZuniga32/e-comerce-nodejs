const favoritoControler = {};
const pool = require('../baseDeDatos');

favoritoControler.render = (req, res) => {
    var session = req.session.user;

    pool.query("SELECT * FROM favoritos , producto WHERE producto.idProducto = favoritos.idProducto AND favoritos.idUsuario = ?", [session.iduser], (err, favoritos) => {
        console.log(favoritos);
        res.render('favoritos', { session: session, data: favoritos });
    });
};

favoritoControler.agregar = (req, res) => {
    var session = req.session.user;

    console.log("añadiendo favorito");
    var idproducto = req.params.idproducto;
    var puntos = req.params.puntos;
    console.log(idproducto + " " + puntos);

    pool.query("SELECT count(*) FROM favoritos WHERE favoritos.idUsuario = ? AND favoritos.idProducto = ?", [session.iduser, idproducto], (err, favoritos) => {
        console.log(favoritos);
        if (favoritos[0]['count(*)'] > 0) {
            res.redirect('/favoritos');
        } else {
            pool.query("INSERT INTO `favoritos`(`idUsuario`, `idProducto`, `puntos`) VALUES (?,?,?)", [session.iduser, idproducto, puntos], (err, favoritos) => {
                if (err) {
                    console.log(err);
                }
                res.redirect('/favoritos');
            });
        }
    });
};

favoritoControler.eliminar = (req, res) => {
    var session = req.session.user;
    var idproducto = req.params.idproducto;

    pool.query("SELECT count(*) FROM favoritos WHERE favoritos.idUsuario = ? AND favoritos.idProducto = ?", [session.iduser, idproducto], (err, favoritos) => {
        if(err){
            console.log(err);
        }
        console.log(favoritos);
        if (favoritos[0]['count(*)'] > 0) {
            pool.query("DELETE FROM `favoritos` WHERE  favoritos.idUsuario = ? AND favoritos.idProducto = ?", [session.iduser, idproducto], (err, favoritos) => {
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

module.exports = favoritoControler;