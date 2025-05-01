import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

// courses data
const courses = [
  { name: 'physics', period: 'fall 2024', initial: '2025-02-22', final: '2025-02-28', status: 'open' },
  { name: 'software', period: 'fall 2024', initial: '2025-02-01', final: '', status: 'closed' },
  { name: 'mathematics', period: 'fall 2024', initial: '2025-02-02', final: '2025-02-14', status: 'closed' },
];

// course table
function CourseTable({ selectedCourse, onSelect }) {
  return (
    <table border="1" cellPadding="8" style={{ width: '100%', marginBottom: '20px' }}>
      <thead>
        <tr style={{ backgroundColor: '#f0f0f0' }}>
          <th>Course Name</th>
          <th>Exam Period</th>
          <th>status</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course, index) => {
          const isSelected = selectedCourse === course.name;
          return (
            <tr
              key={index}
              onClick={() => onSelect(course.name)}
              style={{
                cursor: 'pointer',
                backgroundColor: isSelected ? '#cce5ff' : undefined,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e6f0ff')}
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = isSelected ? '#cce5ff' : '')
              }
            >
              <td>{course.name}</td>
              <td>{course.period}</td>
              <td>{course.status}</td>
              <td>{course.action || '-'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// main page
export default function MyCourses() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <div className='main-container'>
        <div className='main-container-header'>
            <div style={{fontsize:'1.5rem', fontWeight:'bold'}}>Student name, email,</div>
        </div>
        <div className='main-container-body'>
          <CourseTable selectedCourse={selectedCourse} onSelect={setSelectedCourse} />
        </div>
      </div>
    </div>
  );
}