const favoritosRoutes = require('express').Router();
const favoritosControler = require('../controllers/favoritoControler');

favoritosRoutes.get('/', favoritosControler.list);
favoritosRoutes.post('/add/:idproducto/:puntos', favoritosControler.add);
favoritosRoutes.post('/remove/:idproducto', favoritosControler.remove);

module.exports = favoritosRoutes;