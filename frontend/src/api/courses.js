import {get_student_courses_url, get_instructor_courses_url} from '../apiConfig';
import axios from 'axios';

export const fetchStudentCourses = (async (id) => {
  if(!id) return;
  try {
    const res = await axios.get(`${get_student_courses_url}/${id}`);
    console.log('API response: ', res.data);
    const courses = res.data.map((course) => ({
      id: course.id,
      name: course.title,
      period: "Χειμερινή",
      initial: course.createdAt?.split("T")[0] || "-",
      final: course.updatedAt?.split("T")[0] || "-",
    }));
    return courses;
  }
  catch (err) {
    console.error("Failed to fetch student courses:", err);
  }
})

export const fetchInstructorCourses = (async (id) => {
  if(!id) return;
  try {
    const res = await axios.get(`${get_instructor_courses_url}/${id}`);
    console.log('API response: ', res.data);
    const courses = res.data.map((course) => ({
      id: course.id,
      name: course.title,
      period: "Χειμερινή",
      initial: course.createdAt?.split("T")[0] || "-",
      final: course.updatedAt?.split("T")[0] || "-",
    }));
    return courses;
  }
  catch (err) {
    console.error("Failed to fetch student courses:", err);
  }
})