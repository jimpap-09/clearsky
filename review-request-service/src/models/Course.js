// models/GradeReviewRequest.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Course = sequelize.define('Course', {
  courseId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  courseName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  period : {
    type: DataTypes.STRING,
    allowNull: false
  }
  
}, {
  tableName: 'courses',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['courseId']
    }
  ]
});

module.exports = Course;
