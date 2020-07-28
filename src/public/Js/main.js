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



//carga del carrito
function eliminar(idProducto) {
    $.ajax({
        // datos que se envian a traves de ajax
        // archivo que recibe la peticion
        url: "/carrito/remover/" + idProducto,
        // método de envio
        type: "post",
        beforeSend: function () {
            $("#productos").html("Procesando, espere por favor...");
        },
        // una vez que el archivo recibe el request lo procesa y lo devuelve
        success: function (response) {
            location.reload()
        }
    });
}

function addcarrito(idProducto) {
    $.ajax({
        data: {}, //datos que se envian a traves de ajax
        url: "/carrito/cargar/"+idProducto, //archivo que recibe la peticion
        type: 'post', //método de envio
        beforeSend: function () {

        },
        success: function (response) { //una vez que el archivo recibe el request lo procesa y lo devuelve
            $("card-item").html("remove_shopping_cart");
        }
    });
}


//funciones de favoritos
function addfavoritos(idProducto){
    $.ajax({
        data: {}, //datos que se envian a traves de ajax
        url: "/favoritos/agregar/"+idProducto+"/"+$("#puntos").val(), //archivo que recibe la peticion
        type: 'post', //método de envio
        beforeSend: function () {

        },
        success: function (response) { //una vez que el archivo recibe el request lo procesa y lo devuelve
            window.open("/favoritos");
        }
    });
}

function remove(idProducto){
    var url = '/favoritos/eliminar/'+idProducto;

    $.ajax({
        data: {}, //datos que se envian a traves de ajax
        url: url, //archivo que recibe la peticion
        type: 'post', //método de envio
        beforeSend: function() {
            
        },
        success: function(response) { //una vez que el archivo recibe el request lo procesa y lo devuelve
            console.log(response);
            if (response == 1) {
                console.log("eliminando");
                $("#"+idProducto).attr("style","display: none;");
            }
        }
    });
}

function eliminarMedia(idProducto, idMedia){
    $.ajax({
        data: {
            "idmedia" : idMedia
        }, //datos que se envian a traves de ajax
        url: "/administrar/edit/eliminarmedia/"+idProducto, //archivo que recibe la peticion
        type: 'post', //método de envio
        beforeSend: function () {

        },
        success: function (response) { //una vez que el archivo recibe el request lo procesa y lo devuelve
            $("#media"+idProducto).css("display","none");
        }
    });
}