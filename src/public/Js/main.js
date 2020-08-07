function abrir(url, method) {
    window.open(url, method);
}

function abrirVentana(url) {
    window.open(url, "_self");
}

//cargamos la paguina de productos
function cargarPagina(url) {
    ajaxCargar({}, url, 'get', Promise.resolve('#productos'));
}