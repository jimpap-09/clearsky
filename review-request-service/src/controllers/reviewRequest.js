// controllers/gradeReviewController.js
const ReviewRequest = require('../models/reviewRequest');
const axios = require('axios');

exports.createReviewRequest = async (req, res) => {
  const { courseId, studentId, instructorId, studentMessage } = req.body;

  try {
    const existing = await ReviewRequest.findOne({ where: { courseId, studentId } });

    if (existing) {
      return res.status(203).json({ error: 'You have already posted a review request for that course.' });
    }

    const review = await ReviewRequest.create({
      courseId,
      studentId,
      instructorId,
      studentMessage
    });

    await axios.post('http://event-bus:4005/events', {
      type: 'REVIEW_REQUEST',
      data: { studentId, courseId }
    });

    res.set('X-Message', 'Review request created successfully.');
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
  console.log('reply reached backend');
  try {
    const request = await ReviewRequest.findOne({ where: { courseId, studentId } });

    if (!request) {
      return res.status(404).json({ error: 'Review request not found' });
    }
    console.log('specific request found');
    request.professorReply = professorReply;
    request.status = status;
    await request.save();

    console.log('update request is about to sent to event-bus');
    await axios.post('http://event-bus:4005/events', {
      type: 'REVIEW_RESPONSE',
      data: { studentId, courseId }
    });

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
};

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
};

exports.getInstructorPendingReviews = async (req, res) => {
  const { instructorId } = req.params;

  try {
    const requests = await ReviewRequest.findAll({
      where: { instructorId, status: 'pending' }
    });

    const studentIds = [...new Set(requests.map(r => r.studentId))];
    const courseIds = [...new Set(requests.map(r => r.courseId))];

    const usersResponse = await axios.post('http://event-bus:4005/events', {
      type: 'FETCH_USERS_BY_IDS',
      data: { studentIds }
    });

    console.log('usersResponse', usersResponse.data);
    const coursesResponse = await axios.post('http://event-bus:4005/events', {
      type: 'FETCH_COURSES_BY_IDS',
      data: { courseIds }
    });
    console.log('coursesResponse', coursesResponse.data);

    const users = usersResponse.data.results?.find(r => r.service === 'User Management Service')?.response || [];
    const courses = coursesResponse.data.results?.find(r => r.service === 'Course Service')?.response || [];

    const userMap = new Map(users.map(user => [user.id, user.name]));
    const courseMap = new Map(courses.map(course => [
      course.id,
      { title: course.title, period: course.period }
    ]));

    const result = requests.map(req => {
      const courseData = courseMap.get(req.courseId) || { title: 'Unknown Course', period: 'Unknown Period' };
      return {
        request: {
          id: req.id,
          courseId: req.courseId,
          studentId: req.studentId,
          course: courseData.title,
          period: courseData.period,
          student: userMap.get(req.studentId) || 'Unknown Student',
          studentMessage: req.studentMessage,
          professorMessage: req.professorMessage,
          status: req.status,
        }
      };
    });

    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching review requests' });
  }
};
