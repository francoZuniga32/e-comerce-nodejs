const favoritosRoutes = require('express').Router();
const favoritosControler = require('../controllers/favoritoControler');

favoritosRoutes.use(require('../middleware/session').all);
favoritosRoutes.get('/', favoritosControler.render);
favoritosRoutes.post('/agregar', favoritosControler.agregar);
favoritosRoutes.post('/eliminar/:idproducto', favoritosControler.eliminar);

module.exports = favoritosRoutes;