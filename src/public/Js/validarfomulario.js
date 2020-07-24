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

function sendForm(){
    var contrasenia = $("#contrasenia").val()
    $("#contrasenia").val($.sha256(contrasenia));
    console.log("encriptando!!");
    document.getElementById("formulario").submit();
}