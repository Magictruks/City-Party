const mysql = require('mysql');

function initializeConnection(config) {
    function addDisconnectHandler(connection) {
        connection.on("error", function (error) {
            if (error instanceof Error) {
                if (error.code === "PROTOCOL_CONNECTION_LOST") {
                    console.error(error.stack);
                    console.log("Lost connection. Reconnecting...");

                    initializeConnection(connection.config);
                } else if (error.fatal) {
                    throw error;
                }
            }
        });
    }

    var connection = mysql.createConnection(config);

    // Add handlers.
    addDisconnectHandler(connection);

    connection.connect();
    console.log('Connected !');
    return connection;
}

var con = initializeConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "city_party_nodejs",
  });

exports.getById = (sql, data, callback) => {
    con.query(sql, data, (err, result) => {
        if(err) throw err;
        return callback(null, result);
    })
}

exports.get = (sql, callback) => {
    con.query(sql, (err, result) => {
        if(err) throw err;
        return callback(null, result);
    })
}

exports.post = (sql, data, callback) => {
    con.query(sql, data, (err, result) => {
        if(err) {
            console.log(err)
            console.log(err.errno)
        };
        return callback(null, result);
    })
}

exports.put = (sql, data, callback) => {
    con.query(sql, data, (err, result) => {
        if(err) throw err;
        return callback(null, result);
    })
}

exports.delete = (sql, callback) => {
    con.query(sql, (err, result) => {
        if(err) throw err;
        return callback(null, result);
    })
}