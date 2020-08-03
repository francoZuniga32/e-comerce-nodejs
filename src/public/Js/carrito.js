//carga del carrito
function eliminar(idProducto) {
    ajaxEliminar({ "idproducto": idProducto }, "/carrito/remover/", 'post', Promise.resolve("#carrito-" + idProducto));
}

function addcarrito(idProducto) {
    ajaxCargar({}, "/carrito/cargar/" + idProducto, 'post', Promise.resolve(null));
}

function incrementarCantidad(indice, idProducto, longitud) {
    var cantidad = $(`#item-cantidad-${indice}`).val();
    var total = formatPrecio(totalProducto(indice));

    ajaxPeticion({ "idprducto": idProducto, "cantidad": cantidad }, '/carrito/incrementar', 'post');
    $(`#item-total-${indice}`).html(total);
    actualizarSumario(longitud);
}

function totalProducto(indice) {
    var cantidad = $(`#item-cantidad-${indice}`).val();
    var precio = $(`#item-precio-${indice}`).val();

    //obtenemos el precio total
    return obtenerTotal(cantidad, precio);
}

function actualizarSumario(longitud) {
    var total = 0;
    for (var i = 0; i < longitud; i++) {
        total = total + parseFloat(totalProducto(i));
    }
    total = formatPrecio(total);
    $("#sumario-total").html("$"+total);
    console.log(total);
}

function obtenerTotal(cantidad, precio){
    return cantidad * precio;
}

function formatPrecio(numero) {
    var n = (numero + "").split(".");
    var entero = '0';
    var decimal = '00';
    if (n.length >= 2) {
        entero = n[0];
        decimal = primerosDosNumeros(n[1]);
    }
    else if (n.length >= 1) {
        entero = n[0];
    }
    return entero + "." + decimal;
}
function primerosDosNumeros(numero) {
    if (numero.length >= 2) {
        numero = numero.substring(0, 2);
    }
    else if (numero.length == 1) {
        numero = "0" + numero;
    }
    else {
        numero = '00';
    }
    return numero;
}