const indexRouter = require('express').Router();

const INDEX_CONTROLLER = require('../controllers/indexControler');

indexRouter.get('/', INDEX_CONTROLLER.all);

module.exports = indexRouter;