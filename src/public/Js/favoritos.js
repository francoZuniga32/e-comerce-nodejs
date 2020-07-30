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