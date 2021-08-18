const User = require('../models/User')
const jwt = require('jsonwebtoken');

class UserDao {

    create = (user) => {

        return new Promise(async (resolve, reject) => {
            try {
                resolve(await User.create(user));
            } catch (err) {
                reject(err.toString());
            };
        })

    }

    list = (id = null) => {

        return new Promise(async (resolve, reject) => {
            try {
                if (id) {
                    resolve(await User.findByPk(id))
                } else {
                    resolve(await User.findAll({ order: [['id', 'ASC']] }))
                }
            } catch (err) {
                reject(err.toString());
            };
        })

    }

    update = async (user) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(
                    User.update(user,
                        {
                            where: { id: user.id }
                        }
                    )
                );

            } catch (err) {
                reject(err.toString());
            };
        })

    }

    login = async (user) => {

        return new Promise(async (resolve, reject) => {
            try {
                resolve(await User.findOne({ where: { username: user.username, password: user.password } }));
            } catch (err) {
                reject(err.toString());
            };
        })
    }

}

module.exports = new UserDao