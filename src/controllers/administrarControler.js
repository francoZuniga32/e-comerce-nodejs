const administracionControler = {};
const pool = require('../baseDeDatos');
const path = require('path');
const { query } = require('../baseDeDatos');
path.basename('../');

administracionControler.render = async (req, res)=>{
    var session = req.session.user;
    var consultaProductos = "SELECT * FROM producto";
    var consultaMedia = "SELECT * FROM media WHERE media.idProducto = ?";

    var productos = await pool.query(consultaProductos);
    productos.forEach(async element => {
        element.media = await pool.query(consultaMedia, [element.idProducto]);
    });

    res.render("administrar", {productos: productos, session, session});
};

administracionControler.editarRender = async (req, res)=>{
    var session = req.session.user;
    var idproducto = req.params.idproducto;
    var consulta = "SELECT * FROM producto WHERE producto.idProducto = ?";
    var consultaMedia = "SELECT * FROM media WHERE media.idProducto = ?";

    var producto = await pool.query(consulta, [idproducto]);
    var media = await pool.query(consultaMedia, [idproducto]);

    res.render("component/administrar/edit", {producto: producto, media:media, session: session});
};

administracionControler.editar = async (req, res)=>{
    var consulta = "UPDATE producto SET `nombre`= ?,`precio`= ?,`stock`= ?,`descripcion`= ?,`tipo`= ?,`media`= ? WHERE producto.idProducto = ?"
    var productoEditado = {
        "idproducto" : req.body.idproducto,
        "nombre" : req.body.nombre,
        "precio" : req.body.precio,
        "stock" : req.body.stock,
        "descripcion" : req.body.descripcion,
        "tipo" : req.body.tipo
    };

    if (!req.files || Object.keys(req.files).length === 0) {
        var media = await pool.query("SELECT producto.media FROM producto WHERE producto.idProducto = ?",[productoEditado.idproducto]);
        productoEditado.media = media[0].media;
    }else{
        //movemos el elemento a productos y hacemos el cambio en la base de datos
        var file = req.files.file;
        var public = path.join(__dirname, '..', 'public');
        var ruta = "/Media/productos/"+file.name;

        file.mv(path.join(public+ruta), (err, res)=>{
            if(err){
                console.log(err);
            }
        });
        productoEditado.media = ruta;
    }
    pool.query(consulta, [productoEditado.nombre, productoEditado.precio, productoEditado.stock, productoEditado.descripcion, productoEditado.tipo, productoEditado.media, productoEditado.idproducto], (err, producto)=>{
        res.redirect('/administrar');
    });
    console.log(productoEditado);
};

administracionControler.agregarmedia = (req, res) =>{
    var consulta = "INSERT INTO `media` (`idProducto`, `idMedia`, `nombre`, `url`) VALUES (?, NULL, ?, ?)"
    var idproducto = req.params.idproducto;

    if (req.files || Object.keys(req.files).length !== 0) {
        var file = req.files.fileMedia;
        var filename = file.name;
        var public = path.join(__dirname, '..', 'public');
        var ruta = "/Media/productos/"+file.name;

        file.mv(path.join(public+ruta), (err, res)=>{
            if(err){
                console.log(err);
            }
        });
        pool.query(consulta, [idproducto, filename, ruta ], (err, media)=>{
            if(err){
                console.log(err);
            }
            res.redirect('/administrar/edit/'+idproducto);
        });
    }
}

administracionControler.eliminarMedia = (req, res) => {
    var idproducto = req.params.idproducto;
    var idmedia = req.body.idmedia;
    var consulta = "DELETE FROM `media` WHERE media.idProducto = ? AND media.idMedia = ?";

    pool.query(consulta, [idproducto, idmedia], (err, media)=>{
        if(err){
            console.error(err);
        }
        res.status(200);
    });
    
};

administracionControler.agregar = (req, res)=>{

};

administracionControler.eliminar = (req, res)=>{

};

module.exports = administracionControler;