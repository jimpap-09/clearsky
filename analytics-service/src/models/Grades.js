const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming you have a sequelize instance in 'config/db'

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
    },
    isFinalized: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
    tableName: 'grades', // Ensure your table name is 'grades' or adjust as necessary
    timestamps: true     // This adds createdAt and updatedAt fields
});

module.exports = Grades;
