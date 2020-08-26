const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');

exports.get = async(req, res) => {
    try {
        User.get((err, result) => {
            if(err) throw err
            return res.send(result)
        })
    } catch (e) {
      console.log('error : ' + e)
    }
}

exports.getById = async(req, res) => {
    try {
        User.getById(req.params.id, (err, result) => {
            if(err) throw err
            return res.send(result)
        })
    } catch (e) {
      console.log('error : ' + e)
    }
}

exports.getPromoters = async(req, res) => {
    try {
        User.getByRoles('ROLE_PROMOTER', (err, result) => {
            if(err) throw err
            return res.send(result)
        })
    } catch (e) {
        console.log('error : ' + e)
    }
}

exports.post = async(req, res) => {
    try {
        User.getByEmail(req.body.email, (err, result) => {
            if(err) throw err
            if(result.length > 0) return res.send({"message" : "Cette adresse est déjà utilisée"})
            req.body.password = bcrypt.hashSync(req.body.password, null, null)
            User.post(req.body, (err, result) => {
                if(err) throw err
                const user = {id : result.insertId, email: req.body.email, firstname: req.body.firstname, lastname: req.body.lastname, address: req.body.address, roles: req.body.roles, created_at : Date.now()}
                return res.send(user)
            })
        })
    } catch (e) {
      console.log('error : ' + e)
    }
}

exports.put = async(req, res) => {
    try {
        User.put(req.body, req.params.id, (err, result) => {
            if(err) throw err
            const user = {id : req.params.id, email: req.body.email, firstname: req.body.firstname, lastname: req.body.lastname, address: req.body.address, roles: req.body.roles}
            return res.send(user)
        })
    } catch (e) {
      console.log('error : ' + e)
    }
}

exports.delete = async(req, res) => {
    try {
        User.delete(req.params.id, (err, result) => {
            if(err) throw err
            return res.send(result)
        })
    } catch (e) {
      console.log('error : ' + e)
    }
}
