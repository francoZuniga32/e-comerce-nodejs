const express = require('express'),
      path = require('path'),
      morgan = require('morgan'),
      mysql = require('mysql'),
      session = require('express-session'),
      mercadopago = require('mercadopago'),
      body_parser = require('body-parser'),
      md5 = require('md5'),
      fileUpload = require('express-fileupload');

const app = express();

//configuramos: puerto, renderizador, y las vistas
path.basename(__dirname);
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('public', path.join(__dirname, 'public'));

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(body_parser.urlencoded({extended:true}));

app.use(session({
  secret: 'asdasdasdasdasd'
}));
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

//archivos estaticos 
app.use(express.static(path.join(__dirname, 'public')));

//las rutas
app.use('/', require('./routes/index'));
app.use('/productos', require('./routes/productos'));
app.use('/carrito', require('./routes/carrito'));
app.use('/producto', require('./routes/producto'));
app.use('/perfil', require('./routes/perfil'));
app.use('/favoritos', require('./routes/favoritos'));
app.use('/administrar', require('./routes/administrar'));

//iniciamos el servidor
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
