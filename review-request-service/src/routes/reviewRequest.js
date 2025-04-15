const express = require('express');
const reviewRequestController = require('../controllers/reviewRequest');

const router = express.Router();

// POST a review request
router.post('/create', reviewRequestController.createReviewRequest);

// Reply to a review request
router.put('/reply/:courseId/:studentId', reviewRequestController.respondToReviewRequest);

// Get all review requests
router.get('/', reviewRequestController.getAllReviewRequests);

// Get review request
router.get('/student/:courseId/:studentId', reviewRequestController.getStudentReviewRequest);
module.exports = router;
