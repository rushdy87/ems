const Sequelize = require('sequelize');

const sequelize = require('../utils/db');

const Users = sequelize.define('Users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  name: Sequelize.STRING,

  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  authorization_level: {
    type: Sequelize.ENUM('1', '2', '3', '4', '5'),
    allowNull: false,
  },

  avatar: Sequelize.STRING,
});

module.exports = Users;
