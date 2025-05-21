// course table
export default function StudentCourseTable({courses, selectedCourse, onSelect, setView}) {

  if(!courses) return null;

  console.log("Student Course Table: Student Courses: ", courses);
  console.log("Student Course Table: selectedCourse's id: ", selectedCourse?.id);

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
          const isSelected = selectedCourse === course;
          return (
            <tr
            key={index}
            onClick={() => onSelect(course)}
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
              {console.log("Course: ", course.name, " has status: ", course.status)}
              <td>{course.name}</td>
              <td>{course.period}</td>
              <td>{course.status}</td>
              <td style={{ display: 'flex', justifyContent: 'space-around',}}>
                <button
                  onClick={()=>{setView('grades'); console.log('currentView = grades')}}
                >
                  View My Grades
                </button>
                <button
                  className='main-button'
                  onClick={()=>{setView('review'); console.log('currentView = review')}}
                  // disabled={!course.status || course.status !== 'open'}
                >
                  Ask for Review
                </button>
                <button
                  className='main-button'
                  onClick={()=>{setView('status'); console.log('currentView = status')}}
                  // disabled={!course.status || course.status === 'open'}
                >
                  View Review Status
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}