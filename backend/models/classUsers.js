const User = require('./user');
const Class = require('./class');
const sequelize = require('./connection');
const { DataTypes } = require('sequelize');

const classUser = sequelize.define('classUser', {
        userId: {
            type: DataTypes.UUID,
            primaryKey: true,
            references: {
                model: User,
                key: 'userId'
            }
        },
        classId: {
            type: DataTypes.UUID,
            references: {
                model: Class,
                key: 'classId'
            }
        },
        role: {
            type: DataTypes.ENUM('member', 'admin', 'creator'),
            defaultValue: 'member'
        }
    }, {
        tableName: "classUsers",
        timestamps: false
    }
);

module.exports = classUser;
