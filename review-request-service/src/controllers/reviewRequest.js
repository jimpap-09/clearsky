// controllers/gradeReviewController.js
const GradeReviewRequest = require('../models/GradeReviewRequest');

exports.createReviewRequest = async (req, res) => {
  const { courseId, studentId, studentMessage } = req.body;

  try {
    const review = await GradeReviewRequest.create({
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
      const request = await GradeReviewRequest.findOne({
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
      const requests = await GradeReviewRequest.findAll({
        order: [['createdAt', 'DESC']]
      });
  
      res.status(200).json(requests);
    } catch (err) {
      console.error('Fetch all review requests error:', err.message);
      res.status(500).json({ error: 'Failed to retrieve review requests' });
    }
  };