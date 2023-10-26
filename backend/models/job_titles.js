const Sequelize = require('sequelize');

const sequelize = require('../utils/db');
const Users = require('./users');

const JobTitles = sequelize.define('JobTitles', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title_name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
});

JobTitles.belongsTo(Users, { foreignKey: 'user_id' });
Users.hasMany(JobTitles, { foreignKey: 'user_id' });

module.exports = JobTitles;
