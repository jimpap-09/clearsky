import {useState, useEffect} from 'react';
import useAuth from '../../context/AuthContext';
import { fetchStudentCourses } from '../../api/courses';
import StudentCourseTable from '../../components/ui/StudentCourseTable';
import RenderContent from '../../components/ui/RenderContent';

// my courses - main page
export default function MyCourses() {
  const {userData} = useAuth();
  const id = userData?.id;
  const [studentCourses, setStudentCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentView, setCurrentView] = useState('');

  // fetch all student courses
  useEffect(() => {
    const loadCourses = async () => {
      const data = await fetchStudentCourses(id);
      console.log("Courses Fetched: ", data);
      setStudentCourses(data);
    };
    if(id) loadCourses();
  }, [id]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <div className='main-container'>
        <div className='main-container-header'>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Student name, email</div>
        </div>
        <div className='main-container-body'>
          <StudentCourseTable
            courses={studentCourses}
            selectedCourse={selectedCourse}
            onSelect={setSelectedCourse}
            setView={setCurrentView}
          />
        </div>
      </div>
      <RenderContent
        id={id}
        setSelectedCourse={setSelectedCourse}
        selectedCourse={selectedCourse}
        setCurrentView={setCurrentView}
        currentView={currentView}
        personal={true}
      />
      </div>
  );
}