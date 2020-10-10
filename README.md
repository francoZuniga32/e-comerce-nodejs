# e-comerce-nodejs

En estas epocas donde es importante el comercio electronico, uno de los problemas es el desarrollo de ecomerce es el tener que desarrollar la plataforma de cero. Por lo que para ayudar a la comunidad comenze a programar este ecomerce simple. 

## configuracion

Clone este repositorio en alguna lugar de su computador:

```bash
$ git clone https://github.com/francoZuniga32/e-comerce-nodejs.git
$ cd e-comerce-nodejs
```

Configure los datos de la base de datos

```bash
$ npm run configbd
```

Complete los datos, de nombre de usuario, contraseña, y host. Luego de esto importe la base de datos que esta en `src/bd/ecomerce.sql` la cual cotiene las tablas necesarias y el usuario administrativo del sistema.

luego de esto inicio la aplicacion `npm run dev` luego de esto puede ver la aplicacion en localhost:3000. Ingrese al sector administrativo con el usuario admin@gmail.com, y contraseña admin

