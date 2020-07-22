/**
 * Productos: mostrmos los pruductos en la galeria de productos
 * tenemos metodos de paguinacion donde mandamos los datos de paguinacion en el front
 * ademas de eso podemos ir organizando las distintos controladores de las rutas de /productos
 */
const indexControler = {};
const pool = require('../baseDeDatos');

indexControler.inicio = (req, res) => {
    var session = {
        "nombre": req.session.name,
        "tipo": req.session.tipo,
        "iduser": req.session.iduser
    };
    res.render('productos', { session: session });
}

indexControler.paginador = (req, res) => {
    var session = {
        "nombre": req.session.name,
        "tipo": req.session.tipo,
        "iduser": req.session.iduser
    };

    let cantidadPorPaguina = 3;
    let pagina = req.params.pagina;
    let paginaActual = (pagina - 1) * cantidadPorPaguina;

    console.log(paginaActual);

    //listar las imagenes con un id igual al del pro

    pool.query('SELECT * FROM producto LIMIT ?, ?', [paginaActual, cantidadPorPaguina], (err, productos) => {
        if (err) {
            res.json(err);
        }
        //consultamos las imagenes del sistema

        pool.query('SELECT count(*) as total FROM producto', (err, cantidad) => {
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
                session: session
            });
        });
    });
}

module.exports = indexControler;