function validarLoguin() {
    var mail = $("#email").val();
    var contrasenia = $("#contrasenia").val();
    var retorno = true;

    if (mail == null || mail.length == 0 || /^\s+$/.test(mail)) {
        retorno = false;
    } else if (contrasenia == null || contrasenia.length == 0 || /^\s+$/.test(contrasenia)) {
        retorno = false;
    }

    return retorno;
}

function validarRegistro() {
    var mail = $("#email").val();
    var contrasenia = $("#contrasenia").val();
    var confirmarContrasenia = $("#confirmarContrasenia").val();
    var retorno = true;

    if (mail == null || mail.length == 0 || /^\s+$/.test(mail)) {
        retorno = false;
    } else if (contrasenia == null || contrasenia.length == 0 || /^\s+$/.test(contrasenia)){
        retorno = false;
    } else if (confirmarContrasenia == null || confirmarContrasenia.length == 0 || /^\s+$/.test(confirmarContrasenia)){
        retorno = false;
    } else if (contrasenia != confirmarContrasenia){
        retorno = false;
    }

    return  retorno;
}

function validarEditarProducto(){
    var nombre = $('#nombre').val();
    var precio = $('#precio').val();
    var stock = $('#stock').val();
    var descripcion = $('#descripcion').val();
    var tipo = $('#tipo').val();
    var retorno = true;

    if (nombre == null || nombre.length == 0 || /^\s+$/.test(nombre)) {
        retorno = false;
    } else if (precio == null || precio.length == 0 || /^\s+$/.test(precio)){
        retorno = false;
    } else if (stock == null || stock.length == 0 || /^\s+$/.test(stock)){
        retorno = false;
    } else if (descripcion == null || descripcion.length == 0 || /^\s+$/.test(descripcion)){
        retorno = false;
    } else if (tipo == null || tipo.length == 0 || /^\s+$/.test(tipo)){
        retorno = false;
    }

    return retorno;
}

function validaAgregarMedia(){
    var file = $('#fileMedia').val();
    var retorno = true;

    if(file == null || file.length == 0 || /^\s+$/.test(file)){
        retorno = false;
    }

    return retorno;
}

function sendForm(){
    var contrasenia = $("#contrasenia").val()
    $("#contrasenia").val($.sha256(contrasenia));
    console.log("encriptando!!");
    document.getElementById("formulario").submit();
}