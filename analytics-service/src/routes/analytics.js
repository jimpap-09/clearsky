const express = require('express');
const router = express.Router();
const { handleEvent } = require('../controllers/event');
const { getStudentGrades } = require('../controllers/getStudentGrades');
const { getTotalGradeDistribution } = require('../controllers/getTotalGradeDistribution');
const { getQuestionDistribution } = require('../controllers/getQuestionDistribution');

// Receives events from the Event Bus
router.post('/events', handleEvent);

router.get('/student-grades/:studentId/:courseId', getStudentGrades);

router.get('/totalGradeDistribution/:courseId', getTotalGradeDistribution);

router.get('/questionDistribution/:courseId', getQuestionDistribution);

module.exports = router;
