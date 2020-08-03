# Estructura del proyecto

en esta parte se describe la arquitectura del proyecto basado en el modelo vista controlador. La carpeta se constiruye de la siguiente estructura:

```
src/
|__ bd/
|__ controllers/
|__ middleware/
|__ public/
|__ routes/
|__ views/
|__ index.js
|__ config.json
|__ baseDeDatos.js
|__ kays.js
```

## BD

contiene el sql de la base de datos la estructura inicial de la aplicacion de base de datos

## controllers

contiene los controladores de las vistas, procesan fomularios, peticiones, renderizan las vistas, etc'.

## middelware

controlan las sessiones de usuario normal y administrador

## public

contiene los recursos publicos como imagenes de productos y js, css necesarios para el front.

## routes

gestiona las rutas usadas en la aplicacion

## views 

gestiona las viastas de la aplicacion.