import {get_student_grades_url, get_total_grade_distribution_url, get_question_distribution_url} from '../apiConfig';
import axios from 'axios';

// api/coursesStats.js
export const fetchTotalGrades = async (courseId) => {
  const res = await axios.get(`${get_total_grade_distribution_url}/${courseId}`);
  return res.data.totalGradeDistribution;
};

export const fetchQuestionGrades = async (courseId) => {
  const res = await axios.get(`${get_question_distribution_url}/${courseId}`);
  return res.data;
};

export const fetchStudentGrades = async (userId, courseId) => {
  const res = await axios.get(`${get_student_grades_url}/${userId}/${courseId}`);
  return res.data;
};

export const fetchCourseData = async (course) => {
  if (!course) return;
  try {
    const courseId = course.id;
    const [tot_course_grades, tot_question_grades] = await Promise.all([
      fetchTotalGrades(courseId),
      fetchQuestionGrades(courseId),
    ]);
    return { tot_course_grades, tot_question_grades };
  } catch (err) {
    console.error("Failed to fetch course's data:", err);
  }
};
