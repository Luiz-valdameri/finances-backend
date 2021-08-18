const Transaction = require('../models/Transaction')

class TransactionDao {

    create = async (transaction) => {

        return new Promise(async (resolve, reject) => {
            try {
                resolve(await Transaction.create(transaction));
            } catch (err) {
                reject(err.toString());
            };
        })

    }

    list = (id = null) => {

        return new Promise(async (resolve, reject) => {
            try {
                if (id) {
                    resolve(await Transaction.findByPk(id))
                } else {
                    resolve(await Transaction.findAll({ order: [['id', 'ASC']] }))
                }
            } catch (err) {
                reject(err.toString());
            };
        })

    }

    update = async (transaction) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(
                    Transaction.update(transaction,
                        {
                            where: { id: transaction.id }
                        }
                    )
                );

            } catch (err) {
                reject(err.toString());
            };
        })

    }

}

module.exports = new TransactionDao