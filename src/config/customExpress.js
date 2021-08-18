const express = require('express');
const bodyParser = require('body-parser')
const consign = require('consign')
const cors = require('cors')
const { handleError } = require('../config/ErrorHandler')
const { Sequelize } = require('sequelize');


module.exports = () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(cors())
    app.use(handleError);

    consign()
        .include('./src/controllers')
        .into(app);


    (async () => {
        const database = require('./dataBase');

        try {
            await database.sync();
        } catch (error) {
            console.log(error);
        }
    })();

    return app;
}
