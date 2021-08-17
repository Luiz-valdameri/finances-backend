const UserDao = require('../daos/UserDao')
var CryptoJS = require("crypto-js");
require('dotenv/config');

module.exports = app => {

    app.post('/user', (req, res) => {
        var { user } = req.body;
        console.log(user.username)

        var passwordHash = CryptoJS.HmacSHA256(user.password, process.env.AUTH_KEY);
        user.password = CryptoJS.enc.Base64.stringify(passwordHash);

        UserDao.create(user, res);

    })

    app.get('/user', (req, res) => {
        const { id } = req.query;

        UserDao.list(id, res);
    })

    app.put('/user', (req, res) => {
        const { user } = req.body;

        UserDao.update(user, res);

    })

}