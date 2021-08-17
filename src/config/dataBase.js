const Sequelize = require('sequelize');
const sequelize = new Sequelize('crud', 'postgres', 'postgres', { host: 'localhost', dialect: 'postgres' });

module.exports = sequelize;