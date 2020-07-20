const indexRouter = require('express').Router();

const indexControler = require('../controllers/indexControler');

indexRouter.get('/', indexControler.all);

module.exports = indexRouter;