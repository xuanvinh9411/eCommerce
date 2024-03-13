const mysql = require('mysql2')

//create connection to pool server
const pool = mysql.createPool({
    host : 'localhost',
    user : 'tipjs',
    password : '123456',
    database : "shopDev"
})