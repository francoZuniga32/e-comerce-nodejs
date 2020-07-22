const favoritoControler = {};
const pool = require('../baseDeDatos');

favoritoControler.list = (req, res) => {
    var session = {
        "nombre": req.session.name,
        "tipo": req.session.tipo,
        "iduser": req.session.iduser
    };

    pool.query("SELECT * FROM favoritos , producto WHERE producto.idProducto = favoritos.idProducto AND favoritos.idUsuario = ?", [session.iduser], (err, favoritos) => {
        console.log(favoritos);
        res.render('favoritos', { session: session, data: favoritos });
    });
};

favoritoControler.add = (req, res) => {
    var session = {
        "nombre": req.session.name,
        "tipo": req.session.tipo,
        "iduser": req.session.iduser
    };
    console.log("añadiendo favorito");
    var idproducto = req.params.idproducto;
    var puntos = req.params.puntos;
    console.log(idproducto + " " + puntos);

    req.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        }
        conn.query("SELECT count(*) FROM favoritos WHERE favoritos.idUsuario = ? AND favoritos.idProducto = ?", [session.iduser, idproducto], (err, favoritos) => {
            console.log(favoritos);
            if (favoritos[0]['count(*)'] > 0) {
                res.redirect('/favoritos');
            } else {
                conn.query("INSERT INTO `favoritos`(`idUsuario`, `idProducto`, `puntos`) VALUES (?,?,?)", [session.iduser, idproducto, puntos], (err, favoritos) => {
                    if (err) {
                        console.log(err);
                    }
                    res.redirect('/favoritos');
                });
            }
        });
    });
};

favoritoControler.remove = (req, res) => {
    var session = {
        "nombre": req.session.name,
        "tipo": req.session.tipo,
        "iduser": req.session.iduser
    };

    var idproducto = req.params.idproducto;

    req.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        }
        conn.query("SELECT count(*) FROM favoritos WHERE favoritos.idUsuario = ? AND favoritos.idProducto = ?", [session.iduser, idproducto], (err, favoritos) => {
            console.log(favoritos);
            if (favoritos[0]['count(*)'] > 0) {
                conn.query("DELETE FROM `favoritos` WHERE  favoritos.idUsuario = ? AND favoritos.idProducto = ?", [session.iduser, idproducto], (err, favoritos) => {
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
    });
};

module.exports = favoritoControler;