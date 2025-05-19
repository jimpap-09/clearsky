import {useState, useEffect} from 'react';
import { fetchCourseData, fetchStudentGrades } from '../../api/coursesStats';
import StudentCourseTable from '../../components/ui/StudentCourseTable';
import {useParams, useLocation} from 'react-router-dom';
import GradesBox from '../../components/ui/GradesBox';

// main page
export default function PersonalGrades() {
  const [studentGrades, setStudentGrades] = useState([]);
  const [studentCourses, setStudentCourses] = useState([]);
  const [selectedStudentCourse, setSelectedStudentCourse] = useState(null);
  const [courseStats, setCourseStats] = useState(null);
  const [questionStats, setQuestionStats] = useState(null);
  const {studentId, courseId} = useParams();
  const {state} = useLocation();

  useEffect(() => {
    if (state) {
      setStudentCourses(state.courses);
    }
  }, [state]);

  console.log('Parameters: ', useParams());
  console.log('Location:', useLocation());
  console.log('courseId: ', courseId);
  console.log('studentId: ', studentId);
  console.log('courses: ', studentCourses);
  console.log('selected course: ', selectedStudentCourse);

  useEffect(() => {
    const loadGrades = async () => {
      const data = await fetchStudentGrades(studentId, courseId);
      console.log("Grades Fetched: ", data);
      setStudentGrades(data);

      setStudentCourses((prevCourses) =>
        prevCourses.map((course) => {
          if (course.id === courseId) {
            const updatedCourse = {
              ...course,
              status: data.isFinalized === false ? 'open' : 'close'
            };
            setSelectedStudentCourse(updatedCourse);
            return updatedCourse;
          }
          return course;
        })
      );
    };
    if (studentId) loadGrades();
  }, [courseId, studentId]);

  useEffect(() => {
    const loadStats = async () => {
      if (!selectedStudentCourse) return;
      const stats = await fetchCourseData(selectedStudentCourse);
      console.log("Courses Stats: ", stats?.tot_course_grades);
      console.log("Question Stats: ", stats?.tot_question_grades);
      setCourseStats(stats?.tot_course_grades);
      setQuestionStats(stats?.tot_question_grades);
    };
    loadStats();
  }, [selectedStudentCourse]);

  console.log("Selected Course: ", selectedStudentCourse);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <div className='main-container'>
        <div className='main-container-header'>
            <div style={{fontsize:'1.5rem', fontWeight:'bold'}}>Student name, email,</div>
        </div>
        <div className='main-container-body'>
          <StudentCourseTable courses={studentCourses} selectedCourse={selectedStudentCourse} onSelect={setSelectedStudentCourse} />
          {selectedStudentCourse && studentGrades && (
          <GradesBox 
            course={selectedStudentCourse} 
            grades={{ total: studentGrades.totalGrade, ...studentGrades.perQuestion }} 
            title={'My grades'} 
          />
          )}
        </div>
      </div>
    </div>
  );
}