const Transaction = require('../models/Transaction')
const jwt = require('jsonwebtoken');

class TransactionDao {

    create = async (transaction, response) => {

        await Transaction.create(transaction)
            .then(res => {
                response.status(200).json(res)
            })
            .catch(err => {
                response.status(400).json(err)
            })

    }

    list = async (id = null, response) => {

        if (id) {
            await Transaction.findByPk(id)
                .then(res => {
                    response.status(200).json(res)
                })
                .catch(err => {
                    response.status(400).json(err)
                })
        } else {
            await Transaction.findAll({
                order: [
                    ['id', 'ASC']]
            })
                .then(res => {
                    response.status(200).json(res)
                })
                .catch(err => {
                    response.status(400).json(err)
                })
        }

    }

    update = async (transaction, response) => {

        Transaction.update(transaction,
            {
                where: {
                    id: transaction.id
                }
            })
            .then(res => {
                response.status(200).json(res)
            })
            .catch(err => {
                response.status(400).json(err)
            })

    }

}

module.exports = new TransactionDao