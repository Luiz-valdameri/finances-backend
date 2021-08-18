const UserDao = require('../daos/UserDao')
var CryptoJS = require("crypto-js");
require('dotenv/config');
const { authenticateToken } = require("../helper/AuthHelper");

module.exports = app => {

    app.post('/user', (req, res) => {
        var { user } = req.body;

        var passwordHash = CryptoJS.HmacSHA256(user.password, process.env.AUTH_KEY);
        user.password = CryptoJS.enc.Base64.stringify(passwordHash);

        UserDao.create(user)
            .then(response => {
                res.status(200).json(response)
            })
            .catch(err => {
                res.status(500).json({ message: err })
            })

    })

    app.get('/user', authenticateToken, (req, res) => {
        const { id } = req.query;

        UserDao.list(id, res)
            .then(response => {
                res.status(200).json(response)
            })
            .catch(err => {
                res.status(500).json({ message: err })
            })
    })

    app.put('/user', (req, res) => {
        const { user } = req.body;

        UserDao.update(user, res)
            .then(response => {
                res.status(200).json(response)
            })
            .catch(err => {
                res.status(500).json({ message: err })
            })

    })

}