const sqlService = require('../services/sql.service');
const mysql = require('mysql');

const User = {
    get : (callback) => {
        const sql = "SELECT id, firstname, lastname, email, roles, address, latitude, longitude, created_at, image_id FROM user"
        sqlService.get(sql, callback)
    },

    getByEmail : (email, callback) => {
        const sql = "SELECT id, firstname, lastname, email, roles, address, latitude, longitude, created_at, image_id FROM user WHERE email = " + mysql.escape(email)
        sqlService.get(sql, callback)
    },

    getById : (id, callback) => {
        const sql = "SELECT id, firstname, lastname, email, roles, address, latitude, longitude, created_at, image_id FROM user WHERE id = " + mysql.escape(id)
        sqlService.get(sql, callback)
    },

    getByRoles : (roles, callback) => {
        const sql = "SELECT * FROM user WHERE roles = " + mysql.escape(roles)
        sqlService.get(sql, callback)
    },

    post : (User, callback) => {
        const sql = "INSERT INTO user (email, roles, password, firstname, lastname, address, latitude, longitude, image_id) VALUES (?,?,?,?,?,?,?,?,?)"
        const data = [User.email, User.roles, User.password, User.firstname, User.lastname, User.address, User.latitude, User.longitude, User.image_id]
        sqlService.post(sql, data, callback)
    },

    put : (User, id, callback) => {
        const sql = "UPDATE user SET email = ?, roles = ?, password = ?, firstname = ?, lastname = ?, address = ?, latitude = ?, longitude = ?, image_id = ? WHERE id = " + mysql.escape(id)
        const data = [User.email, User.roles, User.password, User.firstname, User.lastname, User.address, User.latitude, User.longitude, User.image_id]
        sqlService.put(sql, data, callback)
    },

    delete: (id, callback) => {
        const sql = "DELETE FROM user WHERE id = " + mysql.escape(id)
        sqlService.delete(sql, callback)
    },
}

module.exports = User