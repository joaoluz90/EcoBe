var pool = require("./connection");

module.exports.getAllStaff = async function() {
    try {
        let sql = "SELECT * FROM Staff";
        let events = await pool.query(sql);
        return {status: 200, result: events};

    } catch(err) {
        console.log(err);
        return {status:500, result: err};
    }
}

module.exports.getStaffById = async function(id) {
    try {
        let sql = "SELECT * FROM Staff WHERE staff_id = ?";
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

module.exports.loginStaff = async function(username, pass) {
    try {
        let sql = "SELECT * FROM Staff WHERE staff_username = ? and staff_password = ?;";
        let result = await pool.query(sql, [username,pass]);
        if(result.length > 0)
            return {status: 200, result: result[0]};
        else return {statuss:401, result: {msg: "Wrong Staff username or password"}};
    } catch(err) {
        console.log(err);
        return {status:500, result: err};
    }
}