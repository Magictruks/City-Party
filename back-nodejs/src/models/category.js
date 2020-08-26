const sqlService = require('../services/sql.service');
const mysql = require('mysql');

const Category = {
    get : (callback) => {
        const sql = "SELECT * FROM category"
        sqlService.get(sql, callback)
    },

    getById : (id, callback) => {
        const sql = "SELECT * FROM category WHERE id = " + mysql.escape(id)
        sqlService.get(sql, callback)
    },

    getByProximity: (latitude, longitude, callback) => {
        // Manque le where
        const sql = "SELECT category.id, category.label FROM event_category INNER JOIN category ON category.id = event_category.category_id INNER JOIN event ON event.id = event_category.event_id GROUP BY category.id"
        sqlService.get(sql, callback)
    },

    post : (Category, callback) => {
        const sql = "INSERT INTO category (label) VALUES (?)";
        const data = [Category.label]
        sqlService.post(sql, data, callback)
    },

    put : (Category, id, callback) => {
        const sql = "UPDATE category SET label = ? WHERE id = " + mysql.escape(id)
        const data = [Category.label]
        sqlService.put(sql, data, callback)
    },

    delete: (id, callback) => {
        const sql = "DELETE FROM category WHERE id = " + mysql.escape(id)
        sqlService.delete(sql, callback)
    }
}

module.exports = Category