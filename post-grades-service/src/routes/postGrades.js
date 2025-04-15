const express = require('express');
const gradeController = require('../controllers/postGrades');

const router = express.Router();

// POST initial grade
router.post('/initialGrades', gradeController.postInitial);

// POST final grade
router.post('/finalGrades', gradeController.postFinal);

module.exports = router;
