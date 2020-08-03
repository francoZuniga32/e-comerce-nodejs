const carritoRouter = require('express').Router();

const carritoControler = require('../controllers/carritoControler');

carritoRouter.use(require('../middleware/session').all);
carritoRouter.get('/', carritoControler.all);
carritoRouter.post('/cargar/:idproducto', carritoControler.add);
carritoRouter.post('/remover/', carritoControler.remove);
carritoRouter.post('/incrementar/', carritoControler.incrementar);

module.exports = carritoRouter;