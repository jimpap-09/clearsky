import {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import useAuth from '../context/AuthContext';
import CourseTable from '../components/ui/CourseTable';
import { fetchStudentCourses } from '../api/courses';
import {buildPath} from '../utils/routes';
import RenderContent from '../components/ui/RenderContent';

// grade statistics - main page
export default function GradeStatistics() {
  const {userData} = useAuth();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [studentCourses, setStudentCourses] = useState([]);
  const [currentView, setCurrentView] = useState(null);
  const navigate = useNavigate();
  const id = userData?.id;

  // fetch student courses
  useEffect(() => {
    const loadCourses = async () => {
      const data = await fetchStudentCourses(id);
      console.log("Courses Fetched: ", data);
      setStudentCourses(data);
    };
    if (id) loadCourses();
  }, [id]);

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
          <CourseTable courses={studentCourses} selectedCourse={selectedCourse} onSelect={setSelectedCourse} setView={setCurrentView}/>
        </div>
          {<RenderContent
            id={id}
            setSelectedCourse={setSelectedCourse}
            selectedCourse={selectedCourse}
            setCurrentView={setCurrentView}
            currentView={currentView}
            personal={false}
          />}
      </div>
    </div>
  );
}