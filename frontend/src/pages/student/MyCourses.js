import {useState, useEffect} from 'react';
import useAuth from '../../context/AuthContext';
import { fetchStudentCourses } from '../../api/courses';
import StudentCourseTable from '../../components/ui/StudentCourseTable';

// main page
export default function MyCourses() {
  const {userData} = useAuth();
  const [studentCourses, setStudentCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const id = userData?.id;

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
            <div style={{fontsize:'1.5rem', fontWeight:'bold'}}>Student name, email,</div>
        </div>
        <div className='main-container-body'>
          <StudentCourseTable userData={userData} courses={studentCourses} selectedCourse={selectedCourse} onSelect={setSelectedCourse} />
        </div>
      </div>
    </div>
  );
}