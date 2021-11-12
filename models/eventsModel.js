var pool = require("./connection");

module.exports.getAllEvents = async function() {
    try {
        let sql = "SELECT * FROM Evento INNER JOIN Praias ON Evento.eve_praia_id = Praias.praia_id INNER JOIN Colaborador ON Colaborador.cola_id = Evento.eve_cola_id;";
        let events = await pool.query(sql);
        return {status: 200, result: events};

    } catch(err) {
        console.log(err);   
        return {status:500, result: err};
    }
}

module.exports.getEventById = async function(id) {
    try {
        let sql = "SELECT Evento.eve_categoria, Evento.eve_estado, Praias.praia_local, Evento.eve_id, Praias.praia_nome, Evento.eve_lotacao, Colaborador.cola_nome, Evento.eve_lotacao, Evento.eve_datainicio, Evento.eve_datafim FROM Evento INNER JOIN Praias ON Evento.eve_praia_id = Praias.praia_id INNER JOIN Colaborador ON Colaborador.cola_id = Evento.eve_cola_id WHERE eve_id = ?";
        let result = await pool.query(sql, [id]);
        console.log(result);
        if(result.length > 0)
            return {status: 200, result: result[0]};
        else return {status: 404, result:{msg: "Event not found!"}};

    } catch(err) {
        console.log(err);
        return {status:500, result: err};
    }
}


module.exports.getEventByState = async function(estado) {
    try {
        let sql = "SELECT Praias.praia_nome, Evento.eve_lotacao, Colaborador.cola_nome, Evento.eve_lotacao, Evento.eve_datainicio, Evento.eve_datafim FROM Evento INNER JOIN Praias ON Evento.eve_praia_id = Praias.praia_id INNER JOIN Colaborador ON Colaborador.cola_id = Evento.eve_cola_id WHERE eve_estado = ?;";
        let result = await pool.query(sql, [estado]);
        console.log(result);
        if(result.length > 0)
            return {status: 200, result: result};
        else return {status: 404, result:{msg: "Event not found!"}};

    } catch(err) {
        console.log(err);
        return {status:500, result: err};
    }
}


module.exports.getEventsFilteredBy = async function(estado,local) {
    try {   
        let sql;
        let params;
        if (!estado && !local) {
            sql ="SELECT * FROM Evento INNER JOIN Praias ON Evento.eve_praia_id = Praias.praia_id INNER JOIN Colaborador ON Colaborador.cola_id = Evento.eve_cola_id;";
            params = [];
        } else if (estado && !local) {    
            sql ="SELECT Praias.praia_local, Evento.eve_estado, Praias.praia_nome, Evento.eve_lotacao, Colaborador.cola_nome, Evento.eve_lotacao, Evento.eve_datainicio, Evento.eve_datafim FROM Evento INNER JOIN Praias ON Evento.eve_praia_id = Praias.praia_id INNER JOIN Colaborador ON Colaborador.cola_id = Evento.eve_cola_id WHERE eve_estado = ?;";
            params = [estado];     
        } else if (!estado && local) {
            sql ="SELECT Evento.eve_estado, Praias.praia_local, Praias.praia_nome, Evento.eve_lotacao, Colaborador.cola_nome, Evento.eve_lotacao, Evento.eve_datainicio, Evento.eve_datafim FROM Evento INNER JOIN Praias ON Evento.eve_praia_id = Praias.praia_id INNER JOIN Colaborador ON Colaborador.cola_id = Evento.eve_cola_id WHERE praia_local = ?;";
            params = [local];     
        } else { // (estado && local)
            sql ="SELECT * FROM Evento INNER JOIN Praias ON Evento.eve_praia_id = Praias.praia_id INNER JOIN Colaborador ON Colaborador.cola_id = Evento.eve_cola_id WHERE eve_estado = ? AND praia_local = ?";
            params = [estado,local];           
        }
        let result = await pool.query(sql,params);
        return { status:200, result: result};
    } catch (err) {
        console.log(err);
        return { status:500, result: err};
    }   
}



module.exports.getEventLotacaoById = async function(id) {
    try {
        let sql = "SELECT COUNT(*) FROM Utilizador JOIN participa ON uti_id = participa.par_uti_id JOIN Evento ON Evento.eve_id = participa.par_eve_id WHERE eve_id = ?";
        let result = await pool.query(sql, [id]);
        console.log(result);
        if(result.length > 0)
            return {status: 200, result: result[0]};
        else return {status: 404, result:{msg: "Event not found!"}};

    } catch(err) {
        console.log(err);
        return {status:500, result: err};
    }
}
