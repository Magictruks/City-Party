const jwt = require('jsonwebtoken');

exports.authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)
    console.log(token)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        console.log(user)
        next()
    })
}

exports.authenticateTokenAdmin = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        if(user.roles !== 'ROLE_ADMIN') return res.sendStatus(403)
        req.user = user
        console.log(user)
        next()
    })
}

exports.generateToken = user => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30m'})
}

exports.clenOldToken = token => {
    delete token.refresh_token
    delete token.exp
    delete token.iat
    return token
}