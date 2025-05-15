import React from 'react';
import {useNavigate} from 'react-router-dom';

// courses data
const courses = [
  { name: 'physics', period: 'fall 2024', initial: '2025-02-22', final: '2025-02-28', status: 'open' },
  { name: 'software', period: 'fall 2024', initial: '2025-02-01', final: '', status: 'closed' },
  { name: 'mathematics', period: 'fall 2024', initial: '2025-02-02', final: '2025-02-14', status: 'closed' },
];

// course table
function CourseTable() {
  const navigate = useNavigate();
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
            <td>{course.name}</td>
            <td>{course.period}</td>
            <td>{course.status}</td>
            <td style={{ display: 'flex', gap: '1rem'}}>
              <button onClick={()=>navigate('/student/personal-grades')}>View My Grades</button>
              <button onClick={()=>navigate('/student/request-review')}
                      disabled={course.status !== 'open'}
                      style={{
                        backgroundColor: course.status !== 'open' ? '#eee' : '#d4f4fa',
                        cursor: course.status !== 'open' ? 'not-allowed' : 'pointer',
                      }}        
              >Ask for Review</button>
              <button onClick={()=>navigate('/student/status')} disabled={course.status === 'open'}
              style={{
                backgroundColor: course.status === 'open' ? '#eee' : '#d4f4fa',
                cursor: course.status === 'open' ? 'not-allowed' : 'pointer',
              }}  
              >View Review Status</button>
            </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// main page
export default function MyCourses() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <div className='main-container'>
        <div className='main-container-header'>
            <div style={{fontsize:'1.5rem', fontWeight:'bold'}}>Student name, email,</div>
        </div>
        <div className='main-container-body'>
          <CourseTable />
        </div>
      </div>
    </div>
  );
}