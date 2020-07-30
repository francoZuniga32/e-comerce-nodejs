function ajaxEliminar(data, url, type, success, error){
    $.ajax({
        data: data,
        url: url, //archivo que recibe la peticion
        type: type, //método de envio
        beforeSend: function () {

        },
        success: function (response, status) { //una vez que el archivo recibe el request lo procesa y lo devuelve
            console.log(status);
            if(status == "success"){
                success.then((idDOM) => {
                    console.log(idDOM);
                    $(idDOM).empty();
                }).catch((err) => {
                    console.log(err);
                });
            }else{
                error.then();
            }
        }
    });
}

function ajaxCargar(data, url, type, success, error){
    $.ajax({
        data: data,
        url: url, //archivo que recibe la peticion
        type: type, //método de envio
        beforeSend: function () {

        },
        success: function (response, status) { //una vez que el archivo recibe el request lo procesa y lo devuelve
            console.log(status);
            if(status == "success"){
                success.then((idDOM) => {
                    $(idDOM).html(response);
                }).catch((err) => {
                    console.log(err);
                });
            }else{
                error.then();
            }
        }
    });
}