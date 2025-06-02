const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const InstructorCourse = sequelize.define('InstructorCourse', {
  instructorId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  courseId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hasReply: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: false
});

module.exports = InstructorCourse;
