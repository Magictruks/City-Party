const sqlService = require('../services/sql.service');
const mysql = require('mysql');

const EventCategory = {
    get : (callback) => {
        const sql = "SELECT * FROM event_category"
        sqlService.get(sql, callback)
    },

    getById : (id, callback) => {
        const sql = "SELECT * FROM event_category WHERE event_id = " + mysql.escape(event_id)
        sqlService.get(sql, callback)
    },

    post : (eventId, categoryIdArray, callback) => {
        let values = ""
        let data = []
        categoryIdArray.forEach(categoryId => {
            values += "(?,?),"
            data.push(eventId, categoryId)
        });
        values = values.substring(0, values.length -1)
        const sql = "INSERT INTO event_category (event_id, category_id) VALUES " + values;
        sqlService.post(sql, data, callback)
    },

    // put : (eventId, categoryIdArray, callback) => {
    //     console.log(eventId)
    //     let values = ""
    //     let data = []
    //     categoryIdArray.forEach(categoryId => {
    //         values += "(?,?),"
    //         data.push(eventId, categoryId)
    //     });
    //     values = values.substring(0, values.length -1)
    //     const sql = "DELETE FROM event_category WHERE event_id = " + mysql.escape(eventId) + "; INSERT INTO event_category (event_id, category_id) VALUES " + values;
    //     sqlService.post(sql, data, callback)
    // },

    delete: (id, callback) => {
        console.log('delete ici')
        console.log(id)
        const sql = "DELETE FROM event_category WHERE event_id = " + mysql.escape(id)
        sqlService.delete(sql, callback)
    }
}

module.exports = EventCategory