// course table - main page
export default function CourseTable({ courses, selectedCourse, onSelect, setView }) {
  
  function handleClick(course) {
    onSelect(course);
    setView('grades');
    return;
  }

  return (
    <table border="1" cellPadding="8" style={{ width: '100%', marginBottom: '20px' }}>
      {/* table headers */}
      <thead>
        <tr style={{ backgroundColor: '#f0f0f0' }}>
          <th>Course Name</th>
          <th>Exam Period</th>
          <th>Initial Grades Submission</th>
          <th>Final Grades Submission</th>
        </tr>
      </thead>
      {/* table body - courses */}
      <tbody>
      {courses.map((course, index) => {
        const isSelected = selectedCourse === course;
        return (
          <tr
            key={index}
            onClick={() => handleClick(course)}
            style={{
              cursor: 'pointer',
              backgroundColor: isSelected ? '#cce5ff' : undefined,
              textAlign: 'center'
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