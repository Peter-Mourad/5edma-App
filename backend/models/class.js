const { DataTypes } = require('sequelize');
const sequelize = require('./connection');
const User = require('./user');

const Class = sequelize.define('Class', {
    classId: {
        type: DataTypes.UUID,
        primaryKey: true, defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false, unique: true
    },
    creatorID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'userID',
        }
    },
    }, {
        tableName: 'Classes'
    }
);

module.exports = Class;