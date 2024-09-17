const { DataTypes } = require('sequelize');
const sequelize = require('./connection');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
        userID: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.ENUM('مخدوم', 'خادم', 'أمين خدمه'), allowNull: false },
        emailConfirmed: { type: DataTypes.BOOLEAN, defaultValue: false },
        birthdate: { type: DataTypes.DATEONLY, allowNull: false },
        qrCode: {type: DataTypes.TEXT, allowNull: false},
        refreshToken: { type: DataTypes.TEXT, allowNull: true }
    }, {
        tableName: 'Users',
        hooks: {
            beforeCreate: async (user) => {
                user.password = await bcrypt.hash(user.password, bcrypt.genSaltSync(10));
            },
        },
    }
);

module.exports = User;