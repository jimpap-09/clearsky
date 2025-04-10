const express = require('express');
const router = express.Router();
const { handleEvent } = require('../controllers/event');
const { getStudentGrades } = require('../controllers/getStudentGrades');

// Receives events from the Event Bus
router.post('/events', handleEvent);

router.get('/student-grades/:studentId/:courseId', getStudentGrades);

module.exports = router;
