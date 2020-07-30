function eliminarMedia(idProducto, idMedia) {
    ajaxEliminar({"idproducto": idProducto, "idmedia": idMedia},"/administrar/edit/eliminarmedia", 'post', Promise.resolve(`#media${idMedia}`));
}

function eliminarProducto(idproducto){
    ajaxEliminar({"idproducto": idproducto}, "/administrar/eliminar/", 'post', Promise.resolve("#producto-"+idproducto));
}
