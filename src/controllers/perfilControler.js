const md5 = require('md5');
const perfilControler = {};

perfilControler.all = (req, res)=>{
    var session = {
        "nombre" : req.session.name,
        "tipo" : req.session.tipo,
        "iduser" : req.session.iduser
    };
    console.log(session);
    res.render('pefil', {session:session});
};

perfilControler.login = (req, res)=>{
    //evaluamos si esta en la session
    var session = {
        "nombre" : req.session.name,
        "tipo" : req.session.tipo,
        "iduser" : req.session.iduser
    };
    
    res.render('login', {session:session});
};

perfilControler.inicio = (req, res)=>{
    req.getConnection((err, conn) => {
        var email = req.body.email;
        var contrasenia = md5(req.body.contrasenia);

        conn.query('SELECT * FROM usuario WHERE email = ? AND contrasenia = ?', [email, contrasenia], (err, usuario)=>{
            if(err){
                console.log(err);
            }
            if(usuario.length > 0){
                req.session.iduser = usuario[0]['idUsuario'];
                req.session.name = usuario[0]['email'];
                req.session.tipo = usuario[0]['tipo'];

                console.log("iduser:"+req.session.iduser);
                res.redirect('/perfil');
            }else{
                res.redirect('/perfil/login');
            }
        });
    });
};

perfilControler.salir = (req, res)=>{
    //eliminamos la session
    req.session.iduser = null;
    req.session.name = null;
    req.session.tipo = null;
    res.redirect('/');
};

module.exports = perfilControler;