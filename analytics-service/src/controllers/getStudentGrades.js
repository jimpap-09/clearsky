// controllers/studentController.js
const Grades = require('../models/Grades');

exports.getStudentGrades = async (req, res) => {
    const { studentId, courseId } = req.params;

    if (!studentId || !courseId) {
        return res.status(400).json({ error: 'studentId and courseId are required' });
    }

    try {
        const gradeRecord = await Grades.findOne({
            where: {
                studentId,
                courseId
            }
        });

        if (!gradeRecord) {
            return res.status(404).json({ error: 'Grade record not found' });
        }

        return res.status(200).json({
            studentId: gradeRecord.studentId,
            courseId: gradeRecord.courseId,
            totalGrade: gradeRecord.totalGrade,
            perQuestion: gradeRecord.perQuestion
        });
    } catch (error) {
        console.error('Error fetching student grades:', error.message);
        return res.status(500).json({ error: 'Failed to retrieve student grades' });
    }
};
