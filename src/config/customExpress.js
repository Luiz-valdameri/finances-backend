const express = require('express');
const bodyParser = require('body-parser')
const consign = require('consign')
var cors = require('cors')


module.exports = () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(cors())

    consign()
        .include('./src/controllers')
        .into(app);

    (async () => {
        const database = require('./dataBase');

        try {
            const resultado = await database.sync();
            console.log(resultado);
        } catch (error) {
            console.log(error);
        }
    })();

    return app;
}
