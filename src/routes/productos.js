const productosRouter = require('express').Router();

const productosController = require('../controllers/productosController');

productosRouter.get('/', productosController.inicio);
productosRouter.get('/pagina/:pagina', productosController.paginador);

module.exports = productosRouter;