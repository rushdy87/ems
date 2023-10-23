const Sequelize = require('sequelize');

const sequelize = require('../utils/db');
const Users = require('./users');

const WorkDay = sequelize.define('WorkDay', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

WorkDay.belongsTo(Users, { foreignKey: 'user_id' });
Users.hasMany(WorkDay, { foreignKey: 'user_id' });

module.exports = WorkDay;
