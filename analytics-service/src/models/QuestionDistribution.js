// models/QuestionDistribution.js
module.exports = (sequelize, DataTypes) => {
    const QuestionDistribution = sequelize.define('QuestionDistribution', {
      courseId: {
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
      }
    });
  
    return QuestionDistribution;
  };
  