const express = require('express');
const uploadController = require('../controllers/uploadGrades');
const validationController = require('../controllers/validateAndSend');

const router = express.Router();

// POST initial grade
router.post('/uploadInitialGrades', uploadController.uploadInitial);

// POST final grade
router.post('/uploadFinalGrades', uploadController.uploadFinal);

// Validate metadata and send

router.post('/validateAndPost', validationController.validateAndSend);
module.exports = router;
