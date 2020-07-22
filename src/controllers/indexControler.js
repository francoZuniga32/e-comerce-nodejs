const indexControler = {};
const pool = require('../baseDeDatos');

indexControler.all = (req, res)=>{
    var session = {
        "nombre" : req.session.name,
        "tipo" : req.session.tipo,
        "iduser" : req.session.iduser
    };
    console.log(session);
    res.render('index', {session: session});
}

module.exports = indexControler;