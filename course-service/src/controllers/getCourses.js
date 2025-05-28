const InstructorCourse = require('../models/InstructorCourse');
const StudentCourse = require('../models/StudentCourse');
const Course = require('../models/Course');

exports.getCoursesByInstructor = async (req, res) => {
    const { instructorId } = req.params;
    try {
        // Step 1: Find courseIds for this instructor
        const instructorCourses = await InstructorCourse.findAll({
            where: { instructorId },
            attributes: ['courseId'],
        });
        const courseIds = instructorCourses.map(ic => ic.courseId);
        // Step 2: Fetch the actual courses
        const courses = await Course.findAll({
            where: { id: courseIds }
        });
        res.json(courses);
    } catch (error) {
        console.error('Error fetching instructor courses:', error);
        res.status(500).json({ error: 'Failed to fetch courses for instructor.' });
    }
};

exports.getCoursesByStudent = async (req, res) => {
    const { studentId } = req.params;
    try {
        const studentCourses = await StudentCourse.findAll({
            where: { studentId },
            attributes: ['courseId'],
        });
        const courseIds = studentCourses.map(sc => sc.courseId);
        const courses = await Course.findAll({
            where: { id: courseIds }
        });
        res.json(courses);
    } catch (error) {
        console.error('Error fetching student courses:', error);
        res.status(500).json({ error: 'Failed to fetch courses for student.' });
    }
};

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.findAll();
        res.json(courses);
    } catch (error) {
        console.error('Error fetching all courses:', error);
        res.status(500).json({ error: 'Failed to fetch all courses.' });
    }
};