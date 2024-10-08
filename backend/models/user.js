const { DataTypes } = require('sequelize');
const sequelize = require('./connection');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
        userId: { type: DataTypes.UUID, primaryKey: true },
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.ENUM('مخدوم', 'خادم', 'أمين خدمه'), allowNull: false },
        emailConfirmed: { type: DataTypes.BOOLEAN, defaultValue: false },
        birthdate: { type: DataTypes.DATEONLY, allowNull: false },
        profilePicture: {type: DataTypes.STRING, allowNull: true},
        qrCode: {type: DataTypes.TEXT, allowNull: false},
        refreshToken: { type: DataTypes.TEXT, allowNull: true }
    }, {
        tableName: 'Users',
        timestamps: false,
        hooks: {
            beforeCreate: async (user) => {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
    }
);

module.exports = User;