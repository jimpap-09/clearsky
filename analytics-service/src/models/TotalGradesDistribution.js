const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming you have a sequelize instance in 'config/db'

const TotalGradeDistribution = sequelize.define('TotalGradeDistribution', {
  courseId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalGrade: {
    type: DataTypes.INTEGER, // e.g., 0 through 10
    allowNull: false,
  },
  count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'total_grade_distributions', // You can adjust the table name as necessary
  timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = TotalGradeDistribution;
