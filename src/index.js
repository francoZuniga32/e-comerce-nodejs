const express = require('express'),
      path = require('path'),
      morgan = require('morgan'),
      mysql = require('mysql'),
      myConnection = require('express-myconnection'),
      session = require('express-session'),
      mercadopago = require('mercadopago'),
      body_parser = require('body-parser'),
      md5 = require('md5');

const app = express();

//configuramos: puerto, renderizador, y las vistas
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'ecomerce'
}, 'single'));
app.use(express.urlencoded({extended: false}));

app.use(body_parser.urlencoded({extended:true}));

app.use(session({
  secret: 'asdasdasdasdasd'
}))

app.use('/', require('./middleware/session').all);


//archivos estaticos 
app.use(express.static(path.join(__dirname, 'public')));

//las rutas
app.use('/', require('./routes/index'));
app.use('/productos', require('./routes/productos'));
app.use('/carrito', require('./routes/carrito'));
app.use('/producto', require('./routes/producto'));
app.use('/perfil', require('./routes/perfil'));
app.use('/favoritos', require('./routes/favoritos'));

//iniciamos el servidor
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
