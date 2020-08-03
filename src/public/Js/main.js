function abrir(idProducto) {
    window.open("/producto/" + idProducto, "_self");
}

function abrirVentana(url) {
    window.open(url, "_self");
}

//cargamos la paguina de productos
function cargarPagina(pagina) {
    
    $.ajax({
        // datos que se envian a traves de ajax
        // archivo que recibe la peticion
        url: "/productos/pagina/" + pagina,
        // método de envio
        type: "get",
        beforeSend: function () {
            $("#productos").html("<div class=\"spinner-border\" role=\"status\"><span class=\"sr-only\">Loading...</span></div>");
        },
        // una vez que el archivo recibe el request lo procesa y lo devuelve
        success: function (response) {
            $("#productos").html(response);
        }
    });
}