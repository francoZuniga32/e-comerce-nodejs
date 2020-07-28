# Rutas-ES

Las rutas de la aplicacion se situan en esta carpeta. La descripcion de estas rutas que se usan.

## Inicio

Renderizamos el inicio de la paguina web, Podremos personalizarlo a las necesidades del negocio.

### GET

| Ruta | Descripcion                          |
| ---- | ------------------------------------ |
| /    | mostramos el incio de la paguina web |

## Perfil

Las rutas del perfil serviran como mecanismo de control de las sessiones de usuario. El usuario puede registrarse para poder hacer uso de dos funcionalidades basicas de la aplicacion, carrito y favoritos.

### GET

| Ruta             | Descripcion                                                  |
| ---------------- | ------------------------------------------------------------ |
| /perfil/         | Se ingresa al perfil del usuario, si no lo esta se retorna el inicio |
| /perfil/login    | Se carga el formulario de ingreso, de caso de que se acceda se crea la session y se retorna el perdil del usaurio |
| /perfil/registro | Se carga el formulario de registro, si se registra exitosamente puede ingresar al fomulario de ingreso |
| /perfil/salir    | Se elimina la session y se pasa retorna al inicio            |

### POST

| Ruta                      | Descripcion                      |
| ------------------------- | -------------------------------- |
| /perfil/login/procesar    | Procesa el formulario de login   |
| /perfil/registro/procesar | Procesa el fomulario de registro |

## Carrito

El carrito permite la acumulacion de productos y poder comprarlos todos de una sola vez.

### GET

| Ruta      | Descripcion                  |
| --------- | ---------------------------- |
| /carrito/ | Carga el carrito del usuario |

### POST

| Ruta                         | Descripcion                                      |
| ---------------------------- | ------------------------------------------------ |
| /carrito/agregar/:idproducto | Agregamos un elemento del carrito del usuario    |
| /carrito/eliminar/:idproduto | Elimininamos un elemento del carrito del usuario |
| /carrito/comprar             | Compramos el carrito del usuario `future`        |

`Advertencia` si el usuario no esta logueado, se redireciconara a el inicio.

## Favoritos

Los favoritos son formas de poder guardar produtos sin la necesidad de querer comprarlos, para luego poder tomar una decicion. Mas adelante se pueden agregar la funcionalidad de compartir por redes sociales.

### GET

| Ruta        | Descripcion                                                  |
| ----------- | ------------------------------------------------------------ |
| /favoritos/ | Cargamos los favoritos del usuario, caso de no estar loguedo redireccionamos al inicio |

### POST

| Ruta                            | Descripcion                                     |
| ------------------------------- | ----------------------------------------------- |
| /favoritos/agregar/:idproducto  | Agregamos el producto como favorito del usuario |
| /favoritos/eliminar/:idproducto | Eliminamos el producto de favoritos del usuario |

## Producto

Este nos carga el detalle del producto seleccionado. Damos los datos sobre el mismo ademas de varias funcionalidades extras.

### GET

| Ruta                  | Descripcion                                                |
| --------------------- | ---------------------------------------------------------- |
| /producto/:idproducto | Mostramos los datos sobre el producto con el id :idproduto |

### POST

| Ruta           | Descripcion              |
| -------------- | ------------------------ |
| /produto/pagar | Compramos dicho producto |

## Productos

Mostramos los productos registrados en el sistema. 

### GET

| Ruta                      | Descripcion                                                  |
| ------------------------- | ------------------------------------------------------------ |
| /productos/               | Cargamos la paguina iniciar de productos, con informacion para que pagina cargar, y |
| /productos/pagina/:pagina | Mostramos los productos paginados                            |

### POST

[none]

# Routes-EN

The routes used in the aplication are located in this folder, from witch the user vies are render.	