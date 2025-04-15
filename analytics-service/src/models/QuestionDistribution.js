const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming you have a sequelize instance in 'config/db'

const QuestionDistribution = sequelize.define('QuestionDistribution', {
  courseId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  examPeriod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  courseName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  questionNo: {
    type: DataTypes.STRING, // e.g., "Q01"
    allowNull: false,
  },
  grade: {
    type: DataTypes.INTEGER, // e.g., 1 through 10
    allowNull: false,
  },
  count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'question_distributions', // You can adjust the table name as necessary
  timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = QuestionDistribution;
