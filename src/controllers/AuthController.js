const UserDao = require('../daos/UserDao');
var CryptoJS = require("crypto-js");
require('dotenv/config');

module.exports = app => {

    app.post('/auth', (req, res) => {
        const { user } = req.body;

        var passwordHash = CryptoJS.HmacSHA256(user.password, process.env.AUTH_KEY);
        user.password = CryptoJS.enc.Base64.stringify(passwordHash);

        UserDao.login(user, res);

    })
}