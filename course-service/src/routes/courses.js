// routes/courses.js
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/getCourses');
const events = require('../controllers/events');

// Course routes
router.post('/events', events.handleEvent);

router.get('/getStudentCourses/:studentId', courseController.getCoursesByStudent);
router.get('/getInstructorCourses/:instructorId', courseController.getCoursesByInstructor);

module.exports = router;
