const { DataTypes } = require('sequelize');
const sequelize = require('./connection');
const User = require('./user');

const Class = sequelize.define('Class', {
    classId: {
        type: DataTypes.UUID,
        primaryKey: true, defaultValue: DataTypes.UUIDV4
    },
    className: {
        type: DataTypes.STRING,
        allowNull: false, unique: true
    },
    creatorId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'userId',
        }
    },
    }, {
        tableName: 'Classes',
        timestamps: false
    }
);

module.exports = Class;