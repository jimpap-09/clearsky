const StudentCourse = require('../models/StudentCourse');
const Course = require('../models/Course');

exports.getCoursesByInstructor = async (req, res) => {
  const { instructorId } = req.params;
  try {
    const hasReplyMap = {};
    const courses = await Course.findAll({
        where: { instructorId: instructorId },
    });

    courses.forEach(sc => {
      hasReplyMap[sc.courseId] = sc.hasReply;
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

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.findAll();
        res.json(courses);
    } catch (error) {
        console.error('Error fetching all courses:', error);
        res.status(500).json({ error: 'Failed to fetch all courses.' });
    }
};