// controllers/gradeReviewController.js
const ReviewRequest = require('../models/reviewRequest');

exports.createReviewRequest = async (req, res) => {
  const { courseId, studentId, studentMessage } = req.body;

  try {
    const review = await ReviewRequest.create({
      courseId,
      studentId,
      studentMessage
    });

    res.status(201).json(review);
  } catch (err) {
    console.error('Create review error:', err.message);
    res.status(500).json({ error: 'Failed to create grade review request' });
  }
};

exports.respondToReviewRequest = async (req, res) => {
    const { courseId, studentId } = req.params;
    const { professorReply, status } = req.body;
  
    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
  
    try {
      const request = await ReviewRequest.findOne({
        where: { courseId, studentId }
      });
  
      if (!request) {
        return res.status(404).json({ error: 'Review request not found' });
      }
  
      request.professorReply = professorReply;
      request.status = status;
      await request.save();
  
      res.status(200).json(request);
  } catch (err) {
    console.error('Reply error:', err.message);
    res.status(500).json({ error: 'Failed to update review request' });
  }
};
  
exports.getAllReviewRequests = async (req, res) => {
  try {
    const requests = await ReviewRequest.findAll({
      order: [['createdAt', 'DESC']]
    });
  
    res.status(200).json(requests);
  } catch (err) {
    console.error('Fetch all review requests error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve review requests' });
  }
};

exports.getStudentReviewRequest = async (req, res) => {
  const { courseId, studentId } = req.params;

  try {
    const request = await ReviewRequest.findOne({
      where: { courseId, studentId }
    });

    if (!request) {
      return res.status(404).json({ error: 'Review request not found' });
    }

    res.status(200).json(request);
  } catch (err) {
    console.error('Fetch student review request error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve review request' });
  }
}

exports.getCourseReviewRequests = async (req, res) => {
  const { courseId } = req.params;

  try {
    const requests = await ReviewRequest.findAll({
      where: { courseId }
    });

    res.status(200).json(requests);
  } catch (err) {
    console.error('Fetch course review requests error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve review requests' });
  }
}