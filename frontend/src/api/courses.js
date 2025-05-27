import {get_student_courses_url, get_all_courses_url} from '../apiConfig';
import axios from 'axios';

// export const fetchMyCourses = async (id, role) => {
//   if(!id || !role) return;
//   const isStudent = (role === 'STUDENT');
//   const script = isStudent ? 'student' : 'instructor';
//   try {
//     const get_courses_url = isStudent ? get_student_courses_url : get_instructor_courses_url;
//     const res = await axios.get(`${get_courses_url}/${id}`);
//     console.log('API response: ', res.data);
//     const courses = res.data.map((course) => ({
//       id: course.id,
//       name: course.title,
//       period: course.period,
//       status: course.status,
//       initial: course.createdAt?.split("T")[0] || "-",
//       final: course.updatedAt?.split("T")[0] || "-",
//     }));
//     return courses;
//   }
//   catch (err) {
//     console.error(`Failed to fetch ${script} courses:`, err);
//   }
// }

export const fetchStudentCourses = async (id) => {
  if(!id) return;
  try {
    const res = await axios.get(`${get_student_courses_url}/${id}`);
    console.log('API response: ', res.data);
    const courses = res.data.map((course) => ({
      id: course.id,
      name: course.title,
      period: course.period,
      status: course.status,
      initial: course.createdAt?.split("T")[0] || "-",
      final: course.updatedAt?.split("T")[0] || "-",
    }));
    return courses;
  }
  catch (err) {
    console.error(`Failed to fetch student courses:`, err);
  }
}

export const fetchAllCourses = async () => {
  try {
    const res = await axios.get(get_all_courses_url);
    console.log('API response: ', res.data);
    const courses = res.data.map((course) => ({
      id: course.id,
      name: course.title,
      period: course.period,
      status: course.status,
      initial: course.createdAt?.split("T")[0] || "-",
      final: course.updatedAt?.split("T")[0] || "-",
    }));
    return courses;
  }
  catch (err) {
    console.error(`Failed to fetch all courses:`, err);
  }
}