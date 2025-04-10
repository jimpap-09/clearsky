// models/TotalGradeDistribution.js
module.exports = (sequelize, DataTypes) => {
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
      }
    });
  
    return TotalGradeDistribution;
  };
  