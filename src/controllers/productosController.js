const productosControlador = {};
const POOL = require('../baseDeDatos');

productosControlador.inicio = (req, res) => {
    res.render('productos', { session: req.session.user });
}

productosControlador.paginador = (req, res) => {
    var cantidadPorPaguina = 3;
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
                    paginaActual: pagina
                },
                session: req.session.user
            });
        });
    });
}

module.exports = productosControlador;