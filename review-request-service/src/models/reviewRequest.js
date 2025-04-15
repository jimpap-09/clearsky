// models/GradeReviewRequest.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ReviewRequest = sequelize.define('ReviewRequest', {
  courseId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  studentId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  studentMessage: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  professorReply: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
    allowNull: false,
    defaultValue: 'pending'
  }
}, {
  tableName: 'review_requests',
  timestamps: true
});

module.exports = ReviewRequest;
