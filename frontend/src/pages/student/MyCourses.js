import {useState, useEffect} from 'react';
import useAuth from '../../context/AuthContext';
import { fetchInstructorCourses, fetchStudentCourses } from '../../api/courses';
import RenderContent from '../../components/ui/RenderContent';
import Table from '../../components/ui/Table';

// my courses - main page
export default function MyCourses() {
  // user data
  const {userData} = useAuth();
  const id = userData?.id;
  const role = userData?.role;
  const email = userData?.email;
  const name = userData?.name;
  const isStudent = role === 'STUDENT';

  // states for vars:
  // courses to be presented
  // selected course with different background color
  // currentView to choose what the rest of the page is
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentView, setCurrentView] = useState('');

  // fetch all student courses
  useEffect(() => {
    const loadCourses = async () => {
      if(isStudent) {
        const data = await fetchStudentCourses(id);
        setCourses(data);
        console.log("Courses Fetched: ", data);
      }
      else if (!isStudent) {
        const data = await fetchInstructorCourses(id);
        setCourses(data);
        console.log("Courses Fetched: ", data);
      }
    };
    if(id) loadCourses();
  }, [id, isStudent]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <div className='main-container'>
        <div className='main-container-header'>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{name}, {email}</div>
        </div>
        <Table
          isStudent={isStudent}
          courses={courses}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          setCurrentView={setCurrentView}
        />
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