const UserDao = require('../daos/UserDao');
var CryptoJS = require("crypto-js");
require('dotenv/config');
const jwt = require('jsonwebtoken')
const { authenticateToken, generateToken } = require("../helper/AuthHelper");


module.exports = app => {

    app.post('/auth', (req, res) => {
        const { user } = req.body;

        var passwordHash = CryptoJS.HmacSHA256(user.password, process.env.AUTH_KEY);
        user.password = CryptoJS.enc.Base64.stringify(passwordHash);

        UserDao.login(user, res)
            .then(response => {
                if (response) {
                    const token = generateToken(response);

                    res.status(200).json({ auth: true, token: token })
                } else {
                    res.status(400).json({ message: "User or password is wrong!" })
                }
            })
            .catch(err => {
                res.status(500).json({ message: "User or password is wrong!" })
            })

    })
}