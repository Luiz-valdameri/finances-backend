const User = require('../models/User')
const jwt = require('jsonwebtoken');

class UserDao {

    create = async (user, response) => {

        await User.create(user)
            .then(res => {
                response.status(200).json(res)
            })
            .catch(err => {
                response.status(400).json(err)
            })

    }

    list = async (id = null, response) => {

        if (id) {
            await User.findByPk(id)
                .then(res => {
                    response.status(200).json(res)
                })
                .catch(err => {
                    response.status(400).json(err)
                })
        } else {
            await User.findAll({
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

    update = async (user, response) => {

        User.update(user,
            {
                where: {
                    id: user.id
                }
            })
            .then(res => {
                response.status(200).json(res)
            })
            .catch(err => {
                response.status(400).json(err)
            })

    }

    login = async (user, response) => {
        await User.findOne({ where: { username: user.username, password: user.password } })
            .then(res => {
                if (res) {
                    const token = jwt.sign({ id: res.id }, process.env.TOKEN_SECRET, {
                        expiresIn: 1800 //30min
                    });

                    response.status(200).json({ auth: true, token: token })
                }else{
                    response.status(400).json({message: "User or password is wrong!"})
                }
            })
            .catch(err => {
                response.status(400).json(err)
            })
    }

}

module.exports = new UserDao