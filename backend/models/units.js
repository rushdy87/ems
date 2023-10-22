const Sequelize = require('sequelize');

const sequelize = require('../utils/db');
const Users = require('./users');

const Units = sequelize.define('Units', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  unit_name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

Units.belongsTo(Users, { foreignKey: 'user_id' });
Users.hasMany(Units, { foreignKey: 'user_id' });

module.exports = Units;
