// models/Grade.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Course = require('./Course');
const Student = require('./Student'); 

const Grade = sequelize.define('Grade', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    initialGrade: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    finalGrade: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
}, {
    tableName: 'grades',
    timestamps: true,
});

// Relationships
Grade.belongsTo(Student, { foreignKey: 'studentId', as: 'student' });
Grade.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });

module.exports = Grade;
