function eliminarMedia(idProducto, idMedia) {
    ajaxEliminar({"idproducto": idProducto, "idmedia": idMedia},"/administrar/edit/eliminarmedia", 'post', Promise.resolve(`#media${idMedia}`));
}

function eliminarProducto(idproducto){
    ajaxEliminar({"idproducto": idproducto}, "/administrar/eliminar/", 'post', Promise.resolve("#producto-"+idproducto));
}

$("#agregarProductoForm").on("submit", function(e){
    e.preventDefault();
    var f = $(this);
    // ... resto del código de mi ejercicio
    var data = {
        "nombre" : $("#nombre").val(),
        "precio" : $("#precio").val(),
        "stock" : $("#stock").val(),
        "descripcion" : $("#descripcion").val(),
        "tipo" : $("#tipo").val(),
        "media" : $("#file").prop('files')
    };
    console.log(data);
    ajaxCargar(data, `/administrar/agregar`, 'post', Promise.resolve(null));
});