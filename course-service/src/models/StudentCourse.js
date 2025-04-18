const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const StudentCourse = sequelize.define('StudentCourse', {
  studentId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  courseId: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = StudentCourse;
