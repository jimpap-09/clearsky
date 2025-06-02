// routes/courses.js
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/getCourses');
const events = require('../controllers/events');

// Course routes
router.post('/events', events.handleEvent);

router.get('/getStudentCourses/:studentId', courseController.getCoursesByStudent);
router.get('/getInstructorCourses/:instructorId', courseController.getCoursesByInstructor);
router.get('/getAllCourses', courseController.getAllCourses);
router.put('/putCourseReview/:studentId/:courseId', courseController.putCourseReview);
router.put('/putCourseReply/:studentId/:courseId', courseController.putCourseReply);
module.exports = router;
