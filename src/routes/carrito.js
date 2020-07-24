const carritoRouter = require('express').Router();

const carritoControler = require('../controllers/carritoControler');

carritoRouter.use(require('../middleware/session').all);
carritoRouter.get('/', carritoControler.all);
carritoRouter.post('/cargar/:idproducto', carritoControler.add);
carritoRouter.post('/remover/:idproducto', carritoControler.remove);

module.exports = carritoRouter;