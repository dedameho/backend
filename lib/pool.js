const mysql = require('mysql');
const {config} = require('./db.config');
const {promisify} = require('util');
const pool = mysql.createPool(config);
pool.getConnection((err,connection)=>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('CONECION CERRADA');
        }
        if(err.code ==='ER_CON_COUNT_ERROR'){
            console.error('LA BASE DE DATOS TIENE MUCHAS CONEXIONES');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('CREDENCIALES INCORRECTAS');
        }
    }
    if(connection){
        connection.release();
        console.log('CONEXION EXITOSA');
    }
})

pool.query = promisify(pool.query);
module.exports = pool;