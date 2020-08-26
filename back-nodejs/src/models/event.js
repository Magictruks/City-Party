const sqlService = require('../services/sql.service');
const mysql = require('mysql');

const Event = {
    get : (callback) => {
        const sql = "SELECT event.id, event.label, event.content, event.address, event.latitude, event.longitude, event.price, event.date_begin_at, event.date_end_at, event.created_at, event.user_id, event.image_id, user.firstname, user.lastname, user.roles FROM event INNER JOIN user ON user.id = user_id"
        sqlService.get(sql, callback)
    },

    getByEventCategory : (event_id, callback) => {
        const sql = "SELECT event_category.event_id, event_category.category_id, event.id, event.label, event.content, event.address, event.latitude, event.longitude, event.price, event.date_begin_at, event.date_end_at, event.created_at, event.user_id, event.image_id FROM event_category INNER JOIN event ON event.id = " + mysql.escape(event_id) + " INNER JOIN category ON category.id = event_category.category_id INNER JOIN user ON user.id = event.user_id WHERE event_category.event_id = " + mysql.escape(event_id)
        sqlService.get(sql, callback)
    },

    getById : (id, callback) => {
        const sql = "SELECT * FROM event WHERE id = " + mysql.escape(id)
        sqlService.get(sql, callback)
    },

    getByProximity: (latitude, longitude, callback) => {
        // Manque le where
        const sql = "SELECT * FROM event_category INNER JOIN category ON category.id = event_category.category_id INNER JOIN event ON event.id = event_category.event_id"
        sqlService.get(sql, callback)
    },

    post : (Event, callback) => {
        const sql = "INSERT INTO event (label, content, address, date_begin_at, date_end_at, user_id, image_id, latitude, longitude, price) VALUES (?,?,?,?,?,?,?,?,?,?);";
        const data = [Event.label, Event.content, Event.address, Event.date_begin_at, Event.date_end_at, Event.user_id, Event.image_id, Event.latitude, Event.longitude, Event.price]
        sqlService.post(sql, data, callback)
    },

    put : (Event, id, callback) => {
        console.log(Event)
        const sql = "UPDATE event SET label = ?, content = ?, address = ?, date_begin_at = ?, date_end_at = ?, user_id = ?, image_id = ?, latitude = ?, longitude = ?, price = ? WHERE id = " + mysql.escape(id)
        const data = [Event.label, Event.content, Event.address, Event.date_begin_at, Event.date_end_at, Event.user_id, Event.image_id, Event.latitude, Event.longitude, Event.price]
        sqlService.put(sql, data, callback)
    },

    delete: (id, callback) => {
        const sql = "DELETE FROM event WHERE id = " + mysql.escape(id)
        sqlService.delete(sql, callback)
    }
}

module.exports = Event