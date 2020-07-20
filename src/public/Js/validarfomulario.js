function validarLoguin(){
    var mail = $("#email").val();
    var contrasenia = $("#contrasenia").val();
    var retorno = true;
    
    if(mail == null || mail.length == 0 || /^\s+$/.test(mail)){
        retorno = false;
    }else if(contrasenia == null || contrasenia.length == 0 || /^\s+$/.test(contrasenia)){
        retorno = false;
    }

    return retorno;
}