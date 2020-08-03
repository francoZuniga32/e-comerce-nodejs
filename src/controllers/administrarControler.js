const administracionControlador = {};
const POOL = require('../baseDeDatos');
const PATH = require('path');
PATH.basename('../');

administracionControlador.render = async (req, res)=>{
    var session = req.session.user;
    var consultaProductos = "SELECT * FROM producto";
    var consultaMedia = "SELECT * FROM media WHERE media.idProducto = ?";

    var productos = await POOL.query(consultaProductos);
    for (let i = 0; i < productos.length; i++) {
        const element = productos[i];
        element.imagenes = await POOL.query(consultaMedia, [element.idProducto]);
    }
    res.render("administrar", {productos: productos, session, session});
};

administracionControlador.editarRender = async (req, res)=>{
    var session = req.session.user;
    var idproducto = req.params.idproducto;
    var consulta = "SELECT * FROM producto WHERE producto.idProducto = ?";
    var consultaMedia = "SELECT * FROM media WHERE media.idProducto = ?";

    var producto = await POOL.query(consulta, [idproducto]);
    var media = await POOL.query(consultaMedia, [idproducto]);

    res.render("component/administrar/edit", {producto: producto, media:media, session: session});
};

administracionControlador.editar = async (req, res)=>{
    var consulta = "UPDATE producto SET `nombre`= ?,`precio`= ?,`stock`= ?,`descripcion`= ?,`tipo`= ?,`media`= ? WHERE producto.idProducto = ?"
    var consultaMedia = "SELECT producto.media FROM producto WHERE producto.idProducto = ?";

    var productoEditado = {
        "idproducto" : req.body.idproducto,
        "nombre" : req.body.nombre,
        "precio" : req.body.precio,
        "stock" : req.body.stock,
        "descripcion" : req.body.descripcion,
        "tipo" : req.body.tipo
    };

    if (!req.files || Object.keys(req.files).length === 0) {
        var media = await POOL.query(consultaMedia,[productoEditado.idproducto]);
        productoEditado.media = media[0].media;
    }else{
        //movemos el elemento a productos y hacemos el cambio en la base de datos
        var file = req.files.file;
        var public = PATH.join(__dirname, '..', 'public');
        var ruta = "/Media/productos/"+file.name;

        file.mv(PATH.join(public+ruta), (err, res)=>{
            if(err){
                console.log(err);
            }
        });
        productoEditado.media = ruta;
    }
    POOL.query(consulta, [productoEditado.nombre, productoEditado.precio, productoEditado.stock, productoEditado.descripcion, productoEditado.tipo, productoEditado.media, productoEditado.idproducto], (err, producto)=>{
        res.redirect('/administrar');
    });
    console.log(productoEditado);
};

administracionControlador.agregarmedia = (req, res) =>{
    var consulta = "INSERT INTO `media` (`idProducto`, `idMedia`, `nombre`, `url`) VALUES (?, NULL, ?, ?)"
    var idproducto = req.body.idproducto;

    if (req.files || Object.keys(req.files).length !== 0) {
        var file = req.files.fileMedia;
        var filename = file.name;
        var public = PATH.join(__dirname, '..', 'public');
        var ruta = "/Media/productos/"+file.name;

        file.mv(PATH.join(public+ruta), (err, res)=>{
            if(err){
                console.log(err);
            }
        });
        POOL.query(consulta, [idproducto, filename, ruta ], (err, media)=>{
            if(err){
                console.log(err);
            }
            res.redirect('/administrar/edit/'+idproducto);
        });
    }
}

administracionControlador.eliminarMedia = (req, res) => {
    var idproducto = req.body.idproducto;
    var idmedia = req.body.idmedia;
    var consulta = "DELETE FROM `media` WHERE media.idProducto = ? AND media.idMedia = ?";

    POOL.query(consulta, [idproducto, idmedia], (err, media)=>{
        if(err){
            console.error(err);
        }
        res.status(200).end();
    });
    
};

administracionControlador.agregarRender = (req, res)=>{
    
};

administracionControlador.agregar = (req, res)=>{
    var consulta = "INSERT INTO `producto`(`idProducto`, `nombre`, `precio`, `stock`, `descripcion`, `tipo`, `media`) VALUES (NULL,?,?,?,?,?,?)";
    var producto = {
        "nombre" : req.body.nombre,
        "precio" : req.body.precio,
        "stock" : req.body.stock,
        "descripcion" : req.body.descripcion,
        "tipo" : req.body.tipo
    };

    if (req.files || Object.keys(req.files).length !== 0) {
        var file = req.files.file;
        var filename = file.name;
        var public = PATH.join(__dirname, '..', 'public');
        var ruta = "/Media/productos/"+filename;
        producto.media = ruta;

        file.mv(PATH.join(public+ruta), (err, res)=>{
            if(err){
                console.log(err);
            }
        });

        console.log(producto);

        POOL.query(consulta, [producto.nombre, producto.precio, producto.stock, producto.descripcion, producto.tipo, producto.media] ,(err, producto)=>{
            if(err){
                console.log(err);
            }
            //a editar: por status end.
            console.log(producto);
            res.redirect('/administrar/');
        });
    }
};

administracionControlador.eliminar = (req, res)=>{
    var idproducto = req.body.idproducto;
    var consultaProducto = "DELETE FROM producto WHERE producto.idProducto = ?";
    var consultaMedia = "DELETE FROM media WHERE media.idProducto = ?"

    POOL.query(consultaProducto, [idproducto], (err, producto)=>{
        if(err){
            console.error(err);
        }
        POOL.query(consultaMedia, [idproducto], (err, media)=>{
            if(err){
                console.error(err);
            }
            res.status(200).end();
        });
    });
};

module.exports = administracionControlador;