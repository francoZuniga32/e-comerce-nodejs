const perfilRouter = require('express').Router();

const perfilControlador = require('../controllers/perfilControler');

perfilRouter.get('/', perfilControlador.all);
perfilRouter.get('/salir', perfilControlador.salir);
perfilRouter.get('/login', perfilControlador.login);
perfilRouter.get('/registro', perfilControlador.registro);
perfilRouter.get('/compra', perfilControlador.procesarCompra);
perfilRouter.post('/login/procesar', perfilControlador.procesarLogin);
perfilRouter.post('/registro/procesar', perfilControlador.procesarRegistro);

module.exports = perfilRouter;