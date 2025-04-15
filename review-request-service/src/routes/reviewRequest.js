const express = require('express');
const reviewRequestController = require('../controllers/reviewRequest');

const router = express.Router();

// POST a review request
router.post('/create', reviewRequestController.createReviewRequest);

// Reply to a review request
router.put('/reply/:courseId/:studentId', reviewRequestController.replyReviewRequest);

// Get all review requests
router.get('/', reviewRequestController.getAllReviewRequests);

module.exports = router;
