const TransactionDao = require('../daos/TransactionDao')
require('dotenv/config');

module.exports = app => {

    app.post('/transaction', (req, res) => {
        var { transaction } = req.body;

        TransactionDao.create(transaction, res)
            .then(response => {
                res.status(200).json(response)
            })
            .catch(err => {
                res.status(500).json({ message: err })
            })

    })

    app.get('/transaction', (req, res) => {
        const { id } = req.query;

        TransactionDao.list(id, res)
            .then(response => {
                res.status(200).json(response)
            })
            .catch(err => {
                res.status(500).json({ message: err })
            })
    })

    app.put('/transaction', (req, res) => {
        const { transaction } = req.body;

        TransactionDao.update(transaction, res)
            .then(response => {
                res.status(200).json(response)
            })
            .catch(err => {
                res.status(500).json({ message: err })
            })

    })

}