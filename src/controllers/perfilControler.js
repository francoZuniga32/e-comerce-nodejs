const POOL = require('../baseDeDatos');
const perfilControlador = {};

perfilControlador.all = (req, res) => {
    res.render('pefil', { session: req.session.user });
};

perfilControlador.login = (req, res) => {
    res.render('login', { session: req.session.user });
};

perfilControlador.procesarLogin = (req, res) => {
    var email = req.body.email;
    var contrasenia = req.body.contrasenia;
    var consulta = "SELECT * FROM usuario WHERE email = ? AND contrasenia = ?";

    POOL.query(consulta, [email, contrasenia], (err, usuario) => {
        if (err) {
            console.log(err);
        }

        if (usuario.length > 0) {
            req.session.user = {
                "iduser" : usuario[0]['idUsuario'],
                "nombre" : usuario[0]['email'],
                "tipo" : usuario[0]['tipo']
            }
            
            console.log("iduser:" + req.session.iduser);
            res.redirect('/perfil');
        } else {
            res.redirect('/perfil/login');
        }
    });
};

perfilControlador.registro = (req, res)=>{
    var session = req.session.user;

    res.render('registro', {session: session});
}

perfilControlador.procesarRegistro = (req, res)=>{
    var session = req.session.user;

    var email = req.body.email;
    var contrasenia = req.body.contrasenia;
    var consulta = "INSERT INTO `usuario`(`idUsuario`, `email`, `contrasenia`, `tipo`) VALUES (NULL,?,?,'normal')";
    
    console.log(contrasenia);
    POOL.query(consulta, [email, contrasenia], (err, usuario)=>{
        if(err){
            console.log(err);
        }
        res.redirect('/perfil/login');
    });
}

perfilControlador.salir = (req, res) => {
    //eliminamos la session
    req.session.user = undefined;
    console.log(req.session.iduser);
    res.redirect('/');
};

module.exports = perfilControlador;