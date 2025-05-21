// controllers/gradeImportController.js

const Course = require('../models/Course');
const StudentCourse = require('../models/StudentCourse');
const InstructorCourse = require('../models/InstructorCourse');

function parseCourseMetadata(headerText) {
    const regex = /ΒΑΘΜΟΛΟΓΙΟ\s+(.*?)\s+\((\d+)\)\s+(.+)/;
    const match = headerText.match(regex);
    if (!match) return null;

    return {
        courseName: match[1].trim(),
        courseId: match[2].trim(),
        examPeriod: match[3].trim(),
    };
}

exports.handleEvent = async (req, res) => {
    const { type, data } = req.body;

    try {
        const { instructorId, grades } = data;
        const headerText = grades[0][0]; // First cell of the first row
        const metadata = parseCourseMetadata(headerText);

        if (!metadata) {
            return res.status(400).json({ error: 'Could not parse course metadata.' });
        }

        const { courseId, courseName, examPeriod } = metadata;
        console.log('Exam Period:', examPeriod);

        // Check if the course exists, if not create it
        let course = await Course.findByPk(courseId);
        if (!course) {
            course = await Course.create({
                id: courseId,
                title: courseName,
                period: examPeriod,
                status: (type === 'FINAL_GRADES') ? 'closed' : 'open'
            });
        }

        // Extract student IDs from the first column (skip header row)
        const studentIds = grades.slice(3).map(row => row[0]);

        // For each studentId, ensure they’re linked to the course
        const uniqueStudentIds = [...new Set(studentIds)];

        const studentCourseEntries = uniqueStudentIds.map(studentId => ({
            studentId: studentId,
            courseId: courseId,
        }));

        // Bulk insert (ignore duplicates if needed)
        await StudentCourse.bulkCreate(studentCourseEntries, { ignoreDuplicates: true });

        await InstructorCourse.findOrCreate({
            where: { instructorId, courseId }
        });

        console.log("Course created/updated:", course);
        console.log("Students enrolled:", uniqueStudentIds);
        console.log("Instructor course association created/updated");
        res.status(200).json({ message: 'Course created/updated and students enrolled successfully.' });
    } catch (err) {
        console.error('📛 Course event error:', err);
        res.status(500).json({ error: 'Failed to process course data.' });
    }
};
