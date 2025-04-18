const express = require('express');
const reviewRequestController = require('../controllers/reviewRequest');
const auth = require('../middleware/auth');
const requireRole = require('../middleware/roles');
const router = express.Router();

// POST a review request
router.post('/create', 
    auth,
    requireRole('STUDENT'),
    reviewRequestController.createReviewRequest

);
// Reply to a review request
router.put('/reply/:courseId/:studentId', 
    auth,
    requireRole('INSTRUCTOR'),
    reviewRequestController.respondToReviewRequest
);

// Get all review requests
router.get('/', 
    auth,
    reviewRequestController.getAllReviewRequests
);

// Get review request
router.get('/student/:courseId/:studentId', 
    auth,
    reviewRequestController.getStudentReviewRequest
);

module.exports = router;
