const sqlService = require('../services/sql.service');
const mysql = require('mysql');

const Auth = {
    login: (email, callback) => {
        const sql = "SELECT id, email, password, roles, firstname, lastname FROM user WHERE email = " + mysql.escape(email)
        sqlService.get(sql, callback)
    },

    register : (User, callback) => {
        const sql = "INSERT INTO user (email, roles, password, firstname, lastname, address, latitude, longitude, image_id) VALUES (?,?,?,?,?,?,?,?,?)"
        const data = [User.email, User.roles, User.password, User.firstname, User.lastname, User.address, User.latitude, User.longitude, User.image_id]
        sqlService.post(sql, data, callback)
    },

    updateRefresh: (refresh, id, callback) => {
        const sql = "UPDATE user SET refresh_token = ? WHERE id = ?"
        const data = [refresh, id]
        sqlService.put(sql, data, callback)
    }
}

module.exports = Auth