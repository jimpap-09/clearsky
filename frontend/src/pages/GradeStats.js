import {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import useAuth from '../context/AuthContext';
import CourseTable from '../components/ui/CourseTable';
import StatsCards from '../components/ui/StatsCards';
import { fetchStudentCourses } from '../api/courses';
import { fetchCourseData } from '../api/coursesStats';
import {buildPath} from '../utils/routes';

// main page
export default function GradeStatistics() {
  const {userData} = useAuth();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [studentCourses, setStudentCourses] = useState([]);
  const [courseStats, setCourseStats] = useState(null);
  const [questionStats, setQuestionStats] = useState(null);
  const navigate = useNavigate();
  const id = userData?.id;
  const title = "Total Distribution";

  useEffect(() => {
    const loadCourses = async () => {
      const data = await fetchStudentCourses(id);
      console.log("Courses Fetched: ", data);
      setStudentCourses(data);
    };
    if (id) loadCourses();
  }, [id]);

  useEffect(() => {
    const loadStats = async () => {
      if (!selectedCourse) return;
      const stats = await fetchCourseData(selectedCourse);
      console.log("Courses Stats: ", stats?.tot_course_grades);
      console.log("Question Stats: ", stats?.tot_question_grades);
      setCourseStats(stats?.tot_course_grades);
      setQuestionStats(stats?.tot_question_grades);
    };
    loadStats();
  }, [selectedCourse]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <div className='main-container'>
        <div className='main-container-header'>
            <div style={{fontsize: '1.5rem', fontWeight: 'bold'}}>Available Course Statistics</div>
            <button
              style={{height: '30px', display: 'flex', alignItems: 'center',}}
              onClick={(e) => navigate(buildPath(userData, 'my-courses'))}
            >
              <Link style={{ textDecoration: 'none', color: 'inherit'}}>
                My Courses
              </Link>
            </button>
        </div>
        <div className='main-container-body'>
          <CourseTable courses={studentCourses} selectedCourse={selectedCourse} onSelect={setSelectedCourse} />
          <StatsCards course={selectedCourse} courseStats={courseStats} title={title} />
          {questionStats && Object.entries(questionStats).map(([question, data]) => (
            <StatsCards key={question} course={selectedCourse} courseStats={data} title={question} />
          ))}
        </div>
      </div>
    </div>
  );
}