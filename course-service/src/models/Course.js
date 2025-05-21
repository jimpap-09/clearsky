// models/Course.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Course = sequelize.define('Course', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    period: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('open', 'closed'),
        allowNull: false,
    },

}, {
    tableName: 'courses',
    timestamps: true
});

Course.associate = (models) => {
    Course.belongsToMany(models.StudentCourse, {
        through: models.StudentCourse,
        foreignKey: 'courseId',
        otherKey: 'studentId',
        as: 'students'
    });
  
    Course.belongsToMany(models.InstructorCourse, {
        through: models.InstructorCourse,
        foreignKey: 'courseId',
        otherKey: 'instructorId',
        as: 'instructors'
    });
};
module.exports = Course;