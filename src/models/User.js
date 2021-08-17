const { Transaction } = require('sequelize');
const Sequelize = require('sequelize');
const database = require('../config/dataBase');
 
const User = database.define('sys_user', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = User;