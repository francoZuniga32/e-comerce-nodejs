const productosControlador = {};
const POOL = require('../baseDeDatos');

var cantidadPorPaguina = 1;

productosControlador.inicio = (req, res) => {
    res.render('productos', { session: req.session.user });
}

productosControlador.paginador = (req, res) => {
    var pagina = req.params.pagina;
    var paginaActual = (pagina - 1) * cantidadPorPaguina;
    var consulta = "SELECT * FROM producto LIMIT ?, ?";
    var consultaTotal = "SELECT count(*) as total FROM producto";

    //listar las imagenes con un id igual al del pro

    POOL.query(consulta, [paginaActual, cantidadPorPaguina], (err, productos) => {
        if (err) {
            res.json(err);
        }
        //consultamos las imagenes del sistema

        POOL.query(consultaTotal, (err, cantidad) => {
            if (err) {
                res.json(err);
            }

            let totalpaginas = Math.round(cantidad[0].total / cantidadPorPaguina);
            console.log("paginacion: totalproductos:" + cantidad[0].total + " total:" + totalpaginas + " pagina acutual: " + pagina);
            res.render('component/productos/productos', {
                data: productos,
                paginacion: {
                    total: totalpaginas,
                    paginaActual: pagina,
                    src: '/productos/pagina/'
                },
                session: req.session.user
            });
        });
    });
}

productosControlador.buscar = (req, res)=>{
    var busqueda = req.query.busqueda;
    var pagina = req.query.pagina || 1;
    var paginaActual = (pagina - 1) * cantidadPorPaguina;
    var consulta = "SELECT * FROM producto WHERE producto.nombre LIKE ? or producto.tipo LIKE ? LIMIT ?, ?";
    var consultaTotal = "SELECT count(*) as total FROM producto WHERE producto.nombre LIKE ? or producto.tipo LIKE ?";

    POOL.query(consulta, [`%${busqueda}%`, `%${busqueda}%`, paginaActual, cantidadPorPaguina], (err, productos) => {
        if (err) {
            res.json(err);
        }
        //consultamos las imagenes del sistema

        POOL.query(consultaTotal, [`%${busqueda}%`, `%${busqueda}%`], (err, cantidad) => {
            if (err) {
                res.json(err);
            }

            let totalpaginas = Math.round(cantidad[0].total / cantidadPorPaguina);
            console.log("paginacion: totalproductos:" + cantidad[0].total + " total:" + totalpaginas + " pagina acutual: " + pagina);
            res.render('busqueda', {
                data: productos,
                paginacion: {
                    total: totalpaginas,
                    paginaActual: pagina,
                    src: `/productos/buscar?busqueda=${busqueda}`
                },
                session: req.session.user
            });
        });
    });

    console.log(req.query);
}

module.exports = productosControlador;