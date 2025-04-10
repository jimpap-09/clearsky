// models/Grades.js
module.exports = (sequelize, DataTypes) => {
    const Grades = sequelize.define('StudentGrade', {
        studentId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        courseId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        totalGrade: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        perQuestion: {
            type: DataTypes.JSONB,
            allowNull: false
        }
    });
  
    return Grades;
  };
  