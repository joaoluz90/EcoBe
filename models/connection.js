var mysql = require('mysql')
var util = require('util')

var pool  = mysql.createPool({
    connectionLimit : 10,
    host     : 'remotemysql.com',
    user     : 'KU4Nz96hyO',
    password : 'bVVivnWmVu',
    database : 'KU4Nz96hyO'
});

pool.query = util.promisify(pool.query)

module.exports = pool