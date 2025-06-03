const express = require('express');
const reviewRequestController = require('../controllers/reviewRequest');
const auth = require('../middleware/auth');
const requireRole = require('../middleware/roles');
const router = express.Router();

// POST a review request
router.post('/createReviewRequest',
    auth,
    requireRole('STUDENT'),
    reviewRequestController.createReviewRequest
);

// Reply to a review request
router.put('/replyToReviewRequest/:courseId/:studentId',
    auth,
    requireRole('INSTRUCTOR'),
    reviewRequestController.respondToReviewRequest
);

// Get all review requests
router.get('/getAllReviewRequests',
    auth,
    reviewRequestController.getAllReviewRequests
);

// Get review request
router.get('/getReviewRequest/:courseId/:studentId',
    auth,
    reviewRequestController.getStudentReviewRequest
);

// Get pending review request by instructor
router.get('/getPendingReviewRequestsByInstructor/:instructorId',
    auth,
    reviewRequestController.getInstructorPendingReviews
);

module.exports = router;
