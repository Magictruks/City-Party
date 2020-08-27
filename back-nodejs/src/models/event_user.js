const sqlService = require('../services/sql.service');
const mysql = require('mysql');
const { participate } = require('../controllers/event');

const EventUser = {

    getByFavorite: (userId, callback) => {
        const sql = "SELECT event_category.event_id, event_category.category_id, category.label, event.id, event.label, event.content, event.address, event.latitude, event.longitude, event.price, event.date_begin_at, event.date_end_at, event.created_at, event.user_id, event.image_id, user.firstname, user.lastname FROM event_user INNER JOIN user ON event_user.user_id = user.id INNER JOIN event_category ON event_user.event_id = event_category.event_id INNER JOIN event ON event.id = event_user.event_id INNER JOIN category ON category.id = event_category.category_id WHERE event_user.user_id = " + mysql.escape(userId)  + " AND event_user.favorite = 1 GROUP BY event_category.event_id"
        sqlService.get(sql, callback)
    },

    getByEventAndUserId: (eventId, userId, callback) => {
        const sql = "SELECT * FROM event_user WHERE event_id = ? AND user_id = ?"
        const data = [eventId, userId]
        sqlService.getById(sql, data, callback)
    },

    post: (eventId, userId, table, callback) => {
        let favorite = 0
        let participate = 0
        console.log('ici')
        console.log(favorite)
        console.log(participate)
        table === 'favorite' ? favorite = 1 : participate = 1
        const sql = "INSERT INTO event_user (event_id, user_id, favorite, participate) VALUES (?,?,?,?)"
        const data = [eventId, userId, favorite, participate]
        sqlService.post(sql, data, callback)
    },

    putFav: (eventId, userId, fav, callback) => {
        console.log(fav)
        const sql = "UPDATE event_user SET favorite = ? WHERE event_id = ? AND user_id = ?"
        const data = [fav, eventId, userId]
        sqlService.put(sql, data, callback)
    },

    putParticipate: (eventId, userId, parti, callback) => {
        const sql = "UPDATE event_user SET participate = ? WHERE event_id = ? AND user_id = ?"
        const data = [parti, eventId, userId]
        sqlService.put(sql, data, callback)
    }
}

module.exports = EventUser
