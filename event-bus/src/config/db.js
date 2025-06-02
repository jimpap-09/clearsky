require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'event_db',
  'postgres',
  'pass',
  {
    host: 'postgres',
    dialect: 'postgres',
    port: 5432,
    logging: false
  }
);

module.exports = sequelize;
