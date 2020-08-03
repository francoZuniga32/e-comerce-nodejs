const mysql = require('mysql');
const util = require('util');
const { database } = require('./kays');

const POOL = mysql.createPool(database);

POOL.getConnection((err, conn)=>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error("LA CONECCION CON LA BASE DE DATOS FUE CERRADA!!");
        }
        if(err.code === 'ER_COUNT_ERROR'){
            console.error("");
        }
        if(err.code === 'ECONNREFUSED'){
            console.error("LA CONECCION CON LA BASE DE DATOS FUE RECHAZADA");
        }
    }
    if(conn){
        conn.release();
        console.log('la base de datos fue conectada!!');
        return;
    }
});

//ahora las cueris pueden usar promesas
POOL.query = util.promisify(POOL.query);

module.exports = POOL;