import mysql from 'mysql2/promise'
import 'dotenv/config'

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,               
    queueLimit: 0,

// field retorna um objeto, cada objeto desse representa uma coluna no banco
    typeCast: function (field, next){
        if( field.type === 'TINY'){
            return Boolean(Number(field.string())) 
        }
    
        return next()
 }
})

