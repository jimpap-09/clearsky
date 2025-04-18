const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const InstructorCourse = sequelize.define('InstructorCourse', {
  instructorId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = InstructorCourse;
