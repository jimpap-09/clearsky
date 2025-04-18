const express = require('express');
const router = express.Router();
const handleEvent = require('../controllers/event');
const getStudentGrades = require('../controllers/getStudentGrades');
const getTotalGradeDistribution = require('../controllers/getTotalGradeDistribution');
const getQuestionDistribution = require('../controllers/getQuestionDistribution');
const auth = require('../middleware/auth');
const requireRole = require('../middleware/roles');

// Receives events from the Event Bus
router.post('/events', 
    handleEvent.handleEvent);

router.get('/studentGrades/:studentId/:courseId', getStudentGrades.getStudentGrades);

router.get('/totalGradeDistribution/:courseId', getTotalGradeDistribution.getTotalGradeDistribution);

router.get('/questionDistribution/:courseId', getQuestionDistribution.getQuestionDistribution);
module.exports = router;
