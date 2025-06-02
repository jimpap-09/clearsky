import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import useAuth from '../context/AuthContext';
import {fetchAllCourses} from '../api/courses';
import {buildPath} from '../utils/routes';
import CourseTable from '../components/ui/CourseTable';
import RenderContent from '../components/ui/RenderContent';

// grade statistics - main page
export default function Statistics() {
  const {userData} = useAuth();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [studentCourses, setStudentCourses] = useState([]);
  const [currentView, setCurrentView] = useState(null);
  const id = userData?.id;
  const role = userData?.role;

  // fetch student courses
  useEffect(() => {
    const loadCourses = async () => {
      const data = await fetchAllCourses(id, role);
      console.log("Courses Fetched: ", data);
      setStudentCourses(data);
    };
    if (id) loadCourses();
  }, [id, role]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <div className='main-container'>
        <div className='main-container-header'>
          <div style={{fontsize: '1.5rem', fontWeight: 'bold'}}>Available Course Statistics</div>
          <button className='main-button'
            style={{height: '30px', display: 'flex', alignItems: 'center',}}
          >
            <Link
              style={{ textDecoration: 'none', color: 'inherit'}}
              to={buildPath(userData, '/my-courses')}
            >
              My Courses
            </Link>
          </button>
        </div>
        <div className='main-container-body'>
          <CourseTable courses={studentCourses} selectedCourse={selectedCourse} onSelect={setSelectedCourse} setView={setCurrentView}/>
        </div>
      </div>
      {<RenderContent
        id={id}
        setSelectedItem={setSelectedCourse}
        selectedItem={selectedCourse}
        setCurrentView={setCurrentView}
        currentView={currentView}
        personal={false}
      />}
    </div>
  );
}