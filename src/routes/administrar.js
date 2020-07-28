const administrarRouter = require('express').Router();
const administrarControle = require('../controllers/administrarControler');

administrarRouter.use(require('../middleware/administracion').midelware);
administrarRouter.get('/',administrarControle.render);
administrarRouter.get('/edit/:idproducto', administrarControle.editarRender);
administrarRouter.post('/edit/', administrarControle.editar);
administrarRouter.post('/edit/aniadirmedia/:idproducto', administrarControle.agregarmedia);
administrarRouter.post('/edit/eliminarmedia/:idproducto', administrarControle.eliminarMedia);


module.exports = administrarRouter;