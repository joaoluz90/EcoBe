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