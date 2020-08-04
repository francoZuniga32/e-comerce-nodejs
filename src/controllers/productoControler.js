const productoControlador = {};
const POOL = require('../baseDeDatos');

const mercadoPago = require('mercadopago');
const session = require('express-session');
const CONFIG_MERCADO_PAGO = require('../config.json').mercadopago;

productoControlador.all = (req, res) => {
  var consulta = "SELECT * FROM producto WHERE idProducto = ?";
  var consultaMedia = "SELECT * FROM media WHERE idProducto = ? ";

  console.log(session);
  POOL.query(consulta, [req.params.idproducto], (err, producto) => {
    if (err) {
      console.log(err);
    }
    POOL.query(consultaMedia, [req.params.idproducto], (err, media) => {
      if (err) {
        res.json(err);
      }
      console.log(producto);
      console.log(media);
      res.render('producto', { data: producto, media: media, session: req.session.user });
    });
  });
};

productoControlador.pagar = (req, res) => {

  var nombre = req.body.nombre;
  var cantidad = parseInt(req.body.cantidad, 10);
  var precio = parseInt(req.body.precio, 10) * cantidad;

  console.log(cantidad + " " + precio);

  var preference = {
    items: [
      {
        title: nombre,
        quantity: cantidad,
        currency_id: 'ARS',
        unit_price: precio
      }
    ],
    back_urls: {
      "success": "http://localhost:3000/compra/success",
      "failure": "http://localhost:3000/compra/failure",
      "pending": "http://localhost:3000/compra/pending"
    },
    shipments: {
      "mode": "custom"
    },
    auto_return: "approved"
  };

  console.log(preference);

  mercadoPago.preferences.create(preference).then(function (mpResponse) {
    console.log(mpResponse);
    res.redirect(mpResponse.body.init_point);
  });
};

module.exports = productoControlador;