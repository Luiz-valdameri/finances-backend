const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        next()
    })
}

const generateToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
        expiresIn: 1800 //30min
    });
}

module.exports = { authenticateToken, generateToken }