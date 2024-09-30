const sequelize = require('./connection');
const User = require('./user');
const Class = require('./class');
const ClassUser = require('./classUsers');

const db = {
  sequelize,
  User,
  Class,
  ClassUser
}

User.hasMany(Class, { foreignKey: 'creatorId' })
Class.belongsTo(User, { foreignKey: 'creatorId' });

User.belongsToMany(Class, { through: ClassUser, foreignKey: 'userId', otherKey: 'classId' });
Class.belongsToMany(User, { through: ClassUser, foreignKey: 'classId', otherKey: 'userId' });

module.exports = db;