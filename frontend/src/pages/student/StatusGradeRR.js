import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

// courses data
const courses = [
  { name: 'physics', period: 'fall 2024', initial: '2025-02-22', final: '2025-02-28' },
  { name: 'software', period: 'fall 2024', initial: '2025-02-01', final: '' },
  { name: 'mathematics', period: 'fall 2024', initial: '2025-02-02', final: '2025-02-14' },
];

// course table
function CourseTable({ selectedCourse, onSelect }) {
  return (
    <table border="1" cellPadding="8" style={{ width: '100%', marginBottom: '20px' }}>
      <thead>
        <tr style={{ backgroundColor: '#f0f0f0' }}>
          <th>Course Name</th>
          <th>Exam Period</th>
          <th>Initial Grades Submission</th>
          <th>Final Grades Submission</th>
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
              <td>{course.initial}</td>
              <td>{course.final || '-'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// card statistics
function StatsCards({ course }) {
  if (!course) return null;

  const base = course.charAt(0).toUpperCase() + course.slice(1);
  const titles = [`${base} - Total`, `${base} - Q1`, `${base} - Q2`, `${base} - Q3`, `${base} - Q4`];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
      }}
    >
      {titles.map((title, index) => (
        <div
          key={index}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '10px',
            backgroundColor: '#fafafa',
          }}
        >
          <h4>{title}</h4>
          <div style={{ height: '100px', textAlign: 'center', color: '#888' }}>Graph Placeholder</div>
        </div>
      ))}
    </div>
  );
}

// main page
export default function GradeStatistics() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <div className='main-container'>
        <div className='main-container-header'>
            <div style={{fontsize: '1.5rem', fontWeight: 'bold'}}>Available Course Statistics</div>
            <button
              style={{height: '30px', display: 'flex', alignItems: 'center'}}
              onClick={(e) => navigate('/')}
            >
              My Courses
            </button>
        </div>
        <div className='main-container-body'>
          <CourseTable selectedCourse={selectedCourse} onSelect={setSelectedCourse} />
          <StatsCards course={selectedCourse} />
        </div>
      </div>
    </div>
  );
}