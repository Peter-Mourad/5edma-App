const sequelize = require('./connection');
const User = require('./user');
const Class = require('./class');

const db = {
  sequelize,
  User,
  Class
}

User.hasMany(Class, { foreignKey: 'creatorID' })
Class.belongsTo(User, { foreignKey: 'creatorID' });

module.exports = db;