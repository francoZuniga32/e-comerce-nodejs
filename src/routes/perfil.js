const perfilRouter = require('express').Router();

const pefilControler = require('../controllers/perfilControler');
const perfilControler = require('../controllers/perfilControler');

perfilRouter.get('/', pefilControler.all);
perfilRouter.get('/salir', pefilControler.salir);
perfilRouter.get('/login', pefilControler.login);
perfilRouter.get('/registro', perfilControler.registro);
perfilRouter.post('/login/procesar', pefilControler.procesarLogin);
perfilRouter.post('/registro/procesar', perfilControler.procesarRegistro);

module.exports = perfilRouter;