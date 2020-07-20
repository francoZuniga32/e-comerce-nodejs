const carritoRouter = require('express').Router();

const carritoControler = require('../controllers/carritoControler');

carritoRouter.get('/', carritoControler.all);
carritoRouter.post('/addproducto/:idproducto', carritoControler.add);
carritoRouter.post('/removerproducto/:idproducto', carritoControler.remove);

module.exports = carritoRouter;