const indexControler = {};
const pool = require('../baseDeDatos');

indexControler.all = (req, res)=>{
    console.log(req.session.user);
    res.render('index', {session: req.session.user});
}

module.exports = indexControler;