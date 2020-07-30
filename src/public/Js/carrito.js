//carga del carrito
function eliminar(idProducto) {
    ajaxEliminar({"idproducto": idProducto}, "/carrito/remover/", 'post', Promise.resolve("#carrito-" + idProducto));
}

function addcarrito(idProducto) {
    $.ajax({
        data: {}, //datos que se envian a traves de ajax
        url: "/carrito/cargar/" + idProducto, //archivo que recibe la peticion
        type: 'post', //método de envio
        beforeSend: function () {

        },
        success: function (response) { //una vez que el archivo recibe el request lo procesa y lo devuelve
            $("card-item").html("remove_shopping_cart");
        }
    });
}