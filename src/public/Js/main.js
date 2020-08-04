function abrir(idProducto) {
    window.open("/producto/" + idProducto, "_self");
}

function abrirVentana(url) {
    window.open(url, "_self");
}

//cargamos la paguina de productos
function cargarPagina(pagina, url) {
    ajaxCargar({}, `${url}${pagina}`, 'get', Promise.resolve('#productos'));
}