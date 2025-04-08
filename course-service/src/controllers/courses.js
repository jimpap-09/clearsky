// controllers/courseController.js
const Course = require('../models/Course');

// Create a course
/*exports.createCourse = async (req, res) => {
    const { title, description, startDate, endDate } = req.body;
    try {
        const newCourse = await Course.create({ title, description, startDate, endDate });
        res.status(201).json(newCourse);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Failed to create course' });
    }
};*/

// Get all courses
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.findAll();
        res.status(200).json(courses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
};

// Assign instructor to a course
/*exports.assignInstructor = async (req, res) => {
    const { courseId, instructorId } = req.body;
    try {
        const instructorCourse = await InstructorCourse.create({ courseId, instructorId });
        res.status(200).json(instructorCourse);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Failed to assign instructor' });
    }
};*/

// Assign student to a course
/*exports.assignStudent = async (req, res) => {
    const { courseId, studentId } = req.body;
    try {
        const studentCourse = await StudentCourse.create({ courseId, studentId });
        res.status(200).json(studentCourse);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Failed to assign student' });
    }
};*/

// Get course details
/*exports.getCourseDetails = async (req, res) => {
    const { courseId } = req.params;
    try {
        const course = await Course.findByPk(courseId, {
            include: [
                { model: Instructor, as: 'instructors' },
                { model: Student, as: 'students' },
            ]
        });
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch course details' });
    }
};*/
