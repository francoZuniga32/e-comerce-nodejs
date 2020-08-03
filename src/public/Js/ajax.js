/**
 * hace la consulta ajax a la url proporcionada y 
 * elimina en el contenedor que contiene la promesa
 * pasada por parametro
 * @param {JSON} data 
 * @param {String} url 
 * @param {String} type 
 * @param {Promise} success 
 * @param {Promise} error
 */
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

/**
 * hace la consulta ajax a la url proporcionada y 
 * la carga en el contenedor que contiene la promesa
 * pasada por parametro
 * @param {JSON} data 
 * @param {String} url 
 * @param {String} type 
 * @param {Promise} success 
 * @param {Promise} error 
 */
function ajaxCargar(data, url, type, success, error){
    $.ajax({
        data: data,
        url: url, //archivo que recibe la peticion
        type: type, //método de envio
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function () {

        },
        success: function (response, status) { //una vez que el archivo recibe el request lo procesa y lo devuelve
            console.log(status);
            if(status == "success"){
                success.then((idDOM) => {
                    if(idDOM){
                        $(idDOM).empty();
                        $(idDOM).html(response);
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }else{
                error.then();
            }
        }
    });
}

function ajaxPeticion(data, url, type){
    $.ajax({
        data: data,
        url: url, //archivo que recibe la peticion
        type: type, //método de envio
        beforeSend: function () {

        },
        success: function (response, status) { //una vez que el archivo recibe el request lo procesa y lo devuelve
            console.log(status);
            if(status == "success"){
                console.log("success!!");
            }else{
                console.log("ERROR: "+response.status);
            }
        }
    });
}