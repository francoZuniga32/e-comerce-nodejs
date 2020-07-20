const productoRouter = require('express').Router();

const productoController = require('../controllers/productoControler');

productoRouter.get('/:idproducto', productoController.all);
productoRouter.post('/pagar', productoController.pagar);

module.exports = productoRouter;