const InstructorCourse = require('../models/InstructorCourse');
const StudentCourse = require('../models/StudentCourse');
const Course = require('../models/Course');

exports.getCoursesByInstructor = async (req, res) => {
  const { instructorId } = req.params;
  try {
    // Step 1: Find courseIds for this instructor
    const instructorCourses = await InstructorCourse.findAll({
        where: { instructorId },
        attributes: ['courseId'],
    });
    const courseIds = instructorCourses.map(ic => ic.courseId);
    const hasReplyMap = {};
    console.log('courseIds: ', courseIds);

    instructorCourses.forEach(sc => {
      hasReplyMap[sc.courseId] = sc.hasReply;
    });

    // Step 2: Fetch the actual courses
    const courses = await Course.findAll({
        where: { id: courseIds }
    });

    const result = courses.map(course => ({
      ...course.toJSON(),
      hasReview: hasReplyMap[course.id] || false
    }));
    console.log('result: ', result);

    res.json(result);
    } catch (error) {
      console.error('Error fetching instructor courses:', error);
      res.status(500).json({ error: 'Failed to fetch courses for instructor.' });
    }
};

exports.getCoursesByStudent = async (req, res) => {
  const { studentId } = req.params;

  try {
    // 1. Get studentCourse entries with hasReview
    const studentCourses = await StudentCourse.findAll({
      where: { studentId },
      attributes: ['courseId', 'hasReview']
    });

    // 2. Extract ids and build a lookup map
    const courseIds = studentCourses.map(sc => sc.courseId);
    const hasReviewMap = {};
    const hasReplyMap = {};

    studentCourses.forEach(sc => {
      hasReviewMap[sc.courseId] = sc.hasReview;
      hasReplyMap[sc.courseId] = sc.hasReply;
    });

    // 3. Get actual course info
    const courses = await Course.findAll({
      where: { id: courseIds }
    });

    console.log('courses: ', courses);

    // 4. Add hasReview from the map
    const result = courses.map(course => ({
      ...course.toJSON(),
      hasReview: hasReviewMap[course.id] || false,
      hasReply: hasReplyMap[course.id] || false,
    }));
    console.log('result: ', result);

    res.json(result);

  } catch (error) {
    console.error('Error fetching student courses:', error);
    res.status(500).json({ error: 'Failed to fetch courses for student.' });
  }
};

exports.putCourseReply = async (req, res) => {
  try {
    const { studentId, courseId } = req.params;
    const { status } = req.body;
    const updated = await StudentCourse.update(
      {hasReply: status},
      {where: {studentId, courseId}}
    );
    console.log('updated: ', updated);
    if(updated[0] === 0) {
      return res.status(404).json({ error:'StudentCourse entry not found' });
    }
    res.status(200).json({ message: 'Reply status updated successfully' });
  } catch (error) {
    console.error('Error updating reply status:', error);
    res.status(500).json({ error: 'Failed to update reply status.' });
  }
}

exports.putCourseReview = async (req, res) => {
  try {
    const { studentId, courseId } = req.params;
    const { status } = req.body;
    const updated = await StudentCourse.update(
      {hasReview: status},
      {where: {studentId, courseId}}
    );
    if(updated[0] === 0) {
      return res.status(404).json({ error:'StudentCourse entry not found' });
    }
    res.status(200).json({ message: 'Review status updated successfully' });
  } catch (error) {
    console.error('Error updating review status:', error);
    res.status(500).json({ error: 'Failed to update review status.' });
  }
}

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.findAll();
        res.json(courses);
    } catch (error) {
        console.error('Error fetching all courses:', error);
        res.status(500).json({ error: 'Failed to fetch all courses.' });
    }
};