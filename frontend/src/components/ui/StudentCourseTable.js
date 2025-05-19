import {useNavigate} from 'react-router-dom';
import { buildPath } from '../../utils/routes';
import useAuth from '../../context/AuthContext';

// course table
export default function StudentCourseTable({courses, selectedCourse}) {
  const navigate = useNavigate();
  const {userData} = useAuth();
  if(!courses) return null;

  console.log("Student Courses: ", courses);
  return (
    <table border="1" cellPadding="8" style={{ width: '100%', marginBottom: '20px' }}>
      <thead>
        <tr style={{ backgroundColor: '#f0f0f0' }}>
          <th>Course Name</th>
          <th>Exam Period</th>
          <th>Grading status</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course, index) => {
          return (
            <tr
              key={index}
              style={{cursor: 'pointer', textAlign: 'center'}}
            >
            {console.log("Course: ", course.name, " has status: ", course.status)}
            <td>{course.name}</td>
            <td>{course.period}</td>
            <td>{course.status}</td>
            <td style={{ display: 'flex', gap: '1rem'}}>
              <button
                onClick={()=>navigate(buildPath(userData, course.id, '/personal-grades'),
                { state: {courses}, selectedCourse: {selectedCourse}})
              }>View My Grades</button>
              <button
                className='main-button'
                onClick={()=>navigate(buildPath(userData, course.id, '/request-review'))}
                disabled={!course.status || course.status !== 'open'} 
              >Ask for Review</button>
              <button
                className='main-button'
                onClick={()=>navigate(buildPath(userData, course.id, '/status'))}
                disabled={!course.status || course.status === 'open'}>
              View Review Status</button>
            </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}