var mysql = require('mysql')
var util = require('util')

var pool  = mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : 'mysqlpassword',
    database : 'ecobe'
});

pool.query = util.promisify(pool.query)

module.exports = pool