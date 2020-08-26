const Auth = require('../models/auth');

const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const jwtService = require('../services/jwt.service');

exports.auth = async(req, res) => {
    Auth.login(req.body.email, (err, user) => {
        if(err) throw err
        if(!bcrypt.compareSync(req.body.password, user[0].password)) return res.send({"message" : "Email ou mot de passe incorrect"})
        delete user[0].password
        let jsonUser = JSON.stringify(user[0])
        jsonUser = JSON.parse(jsonUser)
        delete jsonUser.refresh_token
        const access_token = jwtService.generateToken(jsonUser)
        const refresh_token = jwt.sign(jsonUser, process.env.REFRESH_TOKEN_SECRET)
        Auth.updateRefresh(refresh_token, jsonUser.id, (err, result) => {
            if(err) throw err
            return res.send({ access_token : access_token, refresh_token: refresh_token })
        })
    })
}

exports.register = async(req, res) => {
    Auth.login(req.body.email, (err, result) => {
        if(err) throw err
        if(result.length > 0) return res.send({"message" : "Cette adresse est déjà utilisée"})

        req.body.roles = 'ROLE_USER'
        req.body.password = bcrypt.hashSync(req.body.password, null, null)
        Auth.register(req.body, (err, result) => {
            if(err) throw err
            console.log(result)
            return res.send(result)
        })
    })
}

exports.refreshToken = async(req, res) => {
    const refreshToken = req.body.refresh_token
    if(refreshToken == null) return res.sendStatus(401)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        const newUser = jwtService.clenOldToken(user)
        const access_token = jwtService.generateToken(newUser)
        console.log(access_token)
        return res.send({ access_token : access_token })
    })
}

exports.logout = async(req, res) => {
    console.log(req.body)
    // Auth.updateRefresh(null, req.body.id, (err, result) => {
    //     if(err) throw err
    //     return res.send({"message" : "Vous avez bien été déconnecté"})
    // })
}
