// controllers/gradeReviewController.js
const ReviewRequest = require('../models/reviewRequest');
const axios = require('axios');

exports.createReviewRequest = async (req, res) => {
  const { courseId, studentId, instructorId, studentMessage } = req.body;

  try {

    const existing = await ReviewRequest.findOne({ where: { courseId, studentId } });

    if (existing) {
      console.log('Backend error: You have alr posted a review request for that course.');
      return res.status(203).json({ error: 'You have already posted a review request fot that course.' });
    }
    console.log('Creating a new review request:', {
      courseId,
      studentId,
      instructorId,
      studentMessage
    });
    const review = await ReviewRequest.create({
      courseId,
      studentId,
      instructorId,
      studentMessage
    });

    console.log('A new review has been created!');

    response = await axios.post('http://event-bus:4005/events', {
      type: 'REVIEW_REQUEST',
      data: {
        studentId,
        courseId,
      }
    });

    console.log('PutCourseReview response:', response.data);

    res.set('X-Message', 'Review request created successfully.');
    res.status(201).json(review); // μόνο τα δεδομένα
  
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

    response = await axios.post('http://event-bus:4005/events', {
      type: 'REVIEW_RESPONSE',
      data: {
        studentId,
        courseId,
      }
    });

    console.log('PutCourseReply response:', response.data);

    res.set('X-Message', 'Reply created successfully.');
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

// get all requests by instructor
/* exports.getInstructorReviewRequests = async (req, res) => {
  const {instructorId} = req.params;

  try {
    const requests = await ReviewRequest.findAll({
      where: { instructorId: instructorId },},
    );
    
    const studentIds = [...new Set(requests.map(r => r.studentId))];

    console.log('Instructor-Reviews-users: ', users);
    const result = requests.map(req => {
      const request = {
        id: req.id,
        courseId: req.courseId,
        studentId: req.studentId,
        studentMessage: req.studentMessage,
        professorMessage: req.professorMessage,
        status: req.status,
      }
      console.log('Instructor-Reviews-request: ', request);
      return {
        request
      }
    });

  res.status(200).json(result);

  } catch(err) {
    console.error(err);
    res.status(500).json({message: "Error fetching review requests"});
  }
}
*/

// get all pending requests by instructor
exports.getInstructorPendingReviews = async (req, res) => {
  const {instructorId} = req.params;

  try {
    const requests = await ReviewRequest.findAll({
      where: {instructorId: instructorId, status: 'pending'}},
    );
    
    const result = requests.map(req => {
      const request = {
        id: req.id,
        courseId: req.courseId,
        studentId: req.studentId,
        studentMessage: req.studentMessage,
        professorMessage: req.professorMessage,
        status: req.status,
      }
      console.log('Instructor-Reviews-request: ', request);
      return {
        request
      }
    });

  res.status(200).json(result);

  } catch(err) {
    console.error(err);
    res.status(500).json({message: "Error fetching review requests"});
  }
}