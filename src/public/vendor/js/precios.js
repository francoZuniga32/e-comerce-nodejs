const PRECIO_REGEXP = '/[0-9]*\.[0-9][0-9]/g';
function parsePrecio(precio){
    var retorno = precio;
    if(PRECIO_REGEXP.test(precio)){
        var indicePunto = precio.indexOf('.');
        if(indicePunto > 0){
            var entero = 0;
            if(indicePunto > 1){
                entero = precio.substr(0,indicePunto);
            }

        }
    }
}

function precioValido(precio){
    var retorno = false;
    if(PRECIO_REGEXP.test(precio)){
        retorno = true;
    }
    return retorno;
}