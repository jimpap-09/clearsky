const express = require('express');
const uploadController = require('../controllers/uploadGrades');
const validationController = require('../controllers/validateAndSend');
const router = express.Router();

const auth = require('../middleware/auth');
const requireRole = require('../middleware/roles');

// POST initial grade
router.post('/uploadInitialGrades', 
    auth,
    requireRole('INSTRUCTOR'),
    uploadController.uploadInitialGrades);

// POST final grade
router.post('/uploadFinalGrades', 
    auth,
    requireRole('INSTRUCTOR'),
    uploadController.uploadFinalGrades);

// Validate metadata and send

router.post('/validateAndPost',
    auth,
    requireRole('INSTRUCTOR'),
    validationController.validateAndSend);
module.exports = router;
