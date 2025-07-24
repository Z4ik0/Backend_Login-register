const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('LoginRegister', 'postgres', 'PostgreeIrving', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;