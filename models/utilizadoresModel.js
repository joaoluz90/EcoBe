var pool = require("./connection");


module.exports.getAllUsers = async function() {
    try {
        let sql = "SELECT * FROM Utilizador;";
        let users = await pool.query(sql);
        return {status: 200, result: users};

    } catch(err) {
        console.log(err);
        return {status:500, result: err};
    }
}

module.exports.getUserByUsername = async function(username) {
    try {
        let sql = "SELECT * FROM Utilizador WHERE uti_username = ?";
        let result = await pool.query(sql, [username]);
        console.log(result);
        if(result.length > 0)
            return {status: 200, result: result[0]};
        else return {status: 404, result:{msg: "User not found!"}};

    } catch(err) {
        console.log(err);
        return {status:500, result: err};
    }
}


module.exports.getLeaderboard = async function() {
    try {
        let sql = "SELECT CONCAT(uti_nomeP, ' ', uti_nomeU) AS 'Pessoa', uti_username AS 'username', uti_pontosTotal AS 'Pontos' FROM Utilizador ORDER BY uti_pontosTotal DESC;";
        let users = await pool.query(sql);
        return {status: 200, result: users};

    } catch(err) {
        console.log(err);
        return {status:500, result: err};
    }
}


module.exports.getUsersById = async function(id) {
    try {
        let sql = "SELECT Utilizador.uti_id, Utilizador.uti_nomeP, Utilizador.uti_nomeU, Evento.eve_id FROM Utilizador JOIN participa ON uti_id = participa.par_uti_id JOIN Evento ON Evento.eve_id = participa.par_eve_id WHERE eve_id = ?";
        let result = await pool.query(sql, [id]);
        console.log(result);
        if(result.length > 0)
            return {status: 200, result: result};
        else return {status: 404, result:{msg: "Users not found!"}};

    } catch(err) {
        console.log(err);
        return {status:500, result: err};
    }
}


module.exports.loginStudent = async function(username, pass) {
    try {
        let sql = "SELECT * FROM Utilizador WHERE uti_username = ? and uti_password = ?;";
        let result = await pool.query(sql, [username,pass]);
        if(result.length > 0)
            return {status: 200, result: result[0]};
        else return {statuss:401, result: {msg: "Wrong username or password"}};
    } catch(err) {
        console.log(err);
        return {status:500, result: err};
    }
}


module.exports.enrollUser = async function(utiId,eventId) {
    try {
        let sql ="insert into participa (par_uti_id, par_eve_id) values (?, ?);";
        let result = await pool.query(sql,[utiId,eventId]);
        return { status:200, result:result[0]};
    } catch (err) {
        console.log(err);
        return { status:500, result: err};
    }
}

module.exports.getUserEvents = async function(id) {
    try {
        let sql ="SELECT * FROM Utilizador INNER JOIN participa ON participa.par_uti_id = Utilizador.uti_id INNER JOIN Evento ON Evento.eve_id = participa.par_eve_id WHERE uti_id = ?;";
        let result = await pool.query(sql,[id]);
        let units = result;
        return { status:200, result:units};
    } catch (err) {
        console.log(err);
        return { status:500, result: err};
    }
}