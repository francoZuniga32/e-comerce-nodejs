const carritoRouter = require('express').Router();

const carritoControlador = require('../controllers/carritoControler');

carritoRouter.use(require('../middleware/session').all);
carritoRouter.get('/', carritoControlador.all);
carritoRouter.get('/comprar', carritoControlador.comprar);
carritoRouter.post('/cargar/:idproducto', carritoControlador.add);
carritoRouter.post('/remover/', carritoControlador.remove);
carritoRouter.post('/incrementar/', carritoControlador.incrementar);

module.exports = carritoRouter;