const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('STUDENT', 'INSTRUCTOR', 'ADMIN'),
        allowNull: false
    },
}, {
    tableName: 'users',
    timestamps: true
});

module.exports = User;
