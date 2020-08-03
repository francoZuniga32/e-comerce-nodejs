//funciones de favoritos
function remove(idProducto){
    ajaxEliminar({}, `/favoritos/eliminar/${idProducto}`, 'post', Promise.resolve(`#${idProducto}`));
}

function addfavoritos(idProducto){
    ajaxCargar({"idproducto": idProducto, "puntos": $("#puntos").val() }, `/favoritos/agregar/`, 'post', Promise.resolve(null));
}