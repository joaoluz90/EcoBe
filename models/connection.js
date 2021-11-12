var mysql = require('mysql')
var util = require('util')

var pool  = mysql.createPool({
    connectionLimit : 10,
    host     : 'db4free.net',
    user     : 'joaoluz900',
    password : 'minhoca011',
    database : 'eco_be'
});

pool.query = util.promisify(pool.query)

module.exports = pool