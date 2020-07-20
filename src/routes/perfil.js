const perfilRouter = require('express').Router();

const pefilControler = require('../controllers/perfilControler');

perfilRouter.get('/', pefilControler.all);
perfilRouter.post('/inicio', pefilControler.inicio);
perfilRouter.get('/salir', pefilControler.salir);
perfilRouter.get('/login', pefilControler.login);

module.exports = perfilRouter;