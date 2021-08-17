const {Sequelize, DataTypes} = require('sequelize');
const database = require('../config/dataBase');
const User = require('./User');
 
const Transaction = database.define('transaction', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    startDate: {
        field: 'start_date',
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
    },
    endDate: {
        field: 'end_date',
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
    },
    type: {
        type: Sequelize.ENUM('1', '-1'),
        allowNull: false
    },
    sysUserId: {
        field: 'user_id',
        type: Sequelize.BIGINT
    },
    value: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
})

Transaction.belongsTo(User);
User.hasMany(Transaction);
 
module.exports = Transaction;