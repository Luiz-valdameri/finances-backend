const TransactionDao = require('../daos/TransactionDao')
require('dotenv/config');

module.exports = app => {

    app.post('/transaction', (req, res) => {
        var { transaction } = req.body;

        TransactionDao.create(transaction, res);

    })

    app.get('/transaction', (req, res) => {
        const { id } = req.query;

        TransactionDao.list(id, res);
    })

    app.put('/transaction', (req, res) => {
        const { transaction } = req.body;

        TransactionDao.update(transaction, res);

    })

}