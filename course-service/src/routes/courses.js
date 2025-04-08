// routes/courses.js
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courses');

// Course routes
//router.post('/courses', courseController.createCourse);
router.get('/courses', courseController.getAllCourses);
//router.post('/courses/assign-instructor', courseController.assignInstructor);
//router.post('/courses/assign-student', courseController.assignStudent);
//router.get('/courses/:courseId', courseController.getCourseDetails);

module.exports = router;
