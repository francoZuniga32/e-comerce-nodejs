const productoControler = {};

const mercadopago = require('mercadopago');
const configMercadoPago = require('../config.json').mercadopago;

mercadopago.configure({
    sandbox: true,
    access_token: configMercadoPago.token,
    client_id: configMercadoPago.client_id,
    client_secret: configMercadoPago.client_secret
  });


productoControler.all = (req, res)=>{
  var session = {
    "nombre" : req.session.name,
    "tipo" : req.session.tipo,
    "iduser" : req.session.iduser
  };

  console.log(session);
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM producto WHERE idProducto = ?', [req.params.idproducto], (err, producto)=>{
            if(err){
              console.log(err);
            }
            conn.query('SELECT * FROM media WHERE idProducto = ? ', [req.params.idproducto], (err, media)=>{
                if(err){
                    res.json(err);
                }
                console.log(producto);
                console.log(media);
                res.render('producto', { data: producto, media: media, session:session});
            });
        });
    });
};

productoControler.pagar = (req, res)=>{

    var nombre = req.body.nombre;
    var cantidad = parseInt(req.body.cantidad, 10);
    var precio = parseInt(req.body.precio, 10)*cantidad;

    console.log(cantidad+" "+precio);

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
    shipments :{
      "mode": "custom"
    },
    auto_return: "approved"
  };

  console.log(preference);

  mercadopago.preferences.create(preference).then(function (mpResponse) {
    console.log(mpResponse);
    res.redirect(mpResponse.body.init_point);
  });
};

module.exports = productoControler;