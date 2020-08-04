const productosRouter = require('express').Router();

const productosController = require('../controllers/productosController');
const productosControlador = require('../controllers/productosController');

productosRouter.get('/', productosController.inicio);
productosRouter.get('/pagina/:pagina', productosController.paginador);
productosRouter.get('/buscar/', productosControlador.buscar);

module.exports = productosRouter;