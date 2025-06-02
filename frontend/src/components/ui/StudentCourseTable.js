import { useState, useEffect } from "react";
import { fetchStudentCourses } from "../../api/courses";

// course table
export default function StudentCourseTable({id, selectedCourse, onSelect, setView, refreshTrigger}) {

  const [courses, setCourses] = useState([]);
  
  // fetch all student courses
  useEffect(() => {
    const loadCourses = async () => {
      const data = await fetchStudentCourses(id);
      setCourses(data);
    };
    if(id) loadCourses();
  }, [id, refreshTrigger]);

  if(!courses) return (
    <h1 style={{display:'flex', justifyContent:'center'}}> You are not assigned to courses!</h1>
  );

  console.log("Student Courses: ", courses);
  console.log("selectedCourse's id: ", selectedCourse?.id);

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
          const hasBeenReviewed = course.hasBeenReviewed === true;
          const hasBeenReplied = course.hasBeenReplied === true;
          console.log('course-hasbeenreviewed: ', course.hasBeenReviewed);
          console.log('course-hasbeenreplied: ', course.hasBeenReplied);
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

              <td>{course.name}</td>
              <td>{course.period}</td>
              <td>{course.status}</td>
              <td style={{ display: 'flex', justifyContent: 'space-around',}}>
                <button
                  className="main-button"
                  onClick={()=>{setView('grades'); console.log('currentView = grades')}}
                >
                  View My Grades
                </button>
                <button
                  className='main-button'
                  onClick={()=>{setView('review'); console.log('currentView = review')}}
                  disabled={!course.status || course.status !== 'open' || hasBeenReviewed}
                >
                  Ask for Review
                </button>
                <button
                  className='main-button'
                  onClick={()=>{setView('status'); console.log('currentView = status')}}
                  disabled={!course.status || !hasBeenReplied}
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