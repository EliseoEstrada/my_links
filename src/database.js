const mysql = require('mysql');
const {database} = require('./keys');

const {promisify } = require('util');


const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('CONEXION CON BASE DE DATOS PERDIDA');
        }

        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DEMACIADAS CONEXIONES')
        }

        if(err.code === 'ECONNREFUSED'){
            console.error('CONEXION RECHAZADA')
        }
    }

    if(connection){
        connection.release();
        console.log('DB is Connected');
    }

    
    return;
})

//promisify pool query
//Se usa para convertir callbacks a promesas y poder utilizar async await 
pool.query = promisify(pool.query);
module.exports = pool;