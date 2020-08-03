const INDEX_CONTROLLER = {};
const POOL = require('../baseDeDatos');

INDEX_CONTROLLER.all = (req, res)=>{
    console.log(req.session.user);
    res.render('index', {session: req.session.user});
}

module.exports = INDEX_CONTROLLER;