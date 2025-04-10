const express = require('express');
const gradeController = require('../controllers/postGrades');

const router = express.Router();

// POST initial grade
router.post('/upload', gradeController.uploadGrades);

// POST final grade
//router.post('/final-grade', gradeController.postFinalGrade);

module.exports = router;
