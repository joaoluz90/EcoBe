var pool = require("./connection");

module.exports.getAllColaboradores = async function() {
    try {
        let sql = "SELECT * FROM Colaborador";
        let events = await pool.query(sql);
        return {status: 200, result: events};

    } catch(err) {
        console.log(err);
        return {status:500, result: err};
    }
}

module.exports.getColabById = async function(id) {
    try {
        let sql = "SELECT * FROM Colaborador WHERE cola_id = ?";
        let result = await pool.query(sql, [id]);
        console.log(result);
        if(result.length > 0)
            return {status: 200, result: result[0]};
        else return {status: 404, result:{msg: "Colaborator not found!"}};

    } catch(err) {
        console.log(err);
        return {status:500, result: err};
    }
}

module.exports.loginColaborador = async function(username, pass) {
    try {
        let sql = "SELECT * FROM Colaborador WHERE cola_username = ? and cola_password = ?;";
        let result = await pool.query(sql, [username,pass]);
        if(result.length > 0)
            return {status: 200, result: result[0]};
        else return {statuss:401, result: {msg: "Wrong Colaborador username or password"}};
    } catch(err) {
        console.log(err);
        return {status:500, result: err};
    }
}

module.exports.pesarLixo = async function(lixo,uti,event) {
    try {
        let sql ="UPDATE `participa` SET `par_lixo` = ? WHERE (`par_uti_id` = ? AND par_eve_id = ?	);";
        let result = await pool.query(sql, [lixo,uti,event]);
        return { status:200, result:result[0]};
    } catch (err) {
        console.log(err);
        return { status:500, result: err};
    }
}

module.exports.getColabEventsById = async function(id) {
    try {
        let sql = "SELECT * FROM Evento INNER JOIN Praias ON Evento.eve_praia_id = Praias.praia_id INNER JOIN Colaborador ON Colaborador.cola_id = Evento.eve_cola_id WHERE cola_id = ?;";
        let result = await pool.query(sql, [id]);
        console.log(result);
        if(result.length > 0)
            return {status: 200, result: result};
        else return {status: 404, result:{msg: "Colaborator events not found!"}};

    } catch(err) {
        console.log(err);
        return {status:500, result: err};
    }
}

module.exports.getUserLixo = async function(utiId,eveId) {
    try {
        let params = [utiId,eveId]; 
        let sql = "SELECT par_lixo FROM participa WHERE par_uti_id = ? AND par_eve_id = ?;";
        let result = await pool.query(sql, params);
        console.log(result);
        return { status:200, result: result};

    } catch(err) {
        console.log(err);
        return {status:500, result: err};
    }
}