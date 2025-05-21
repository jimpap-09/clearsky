import StudentCourseTable from "./StudentCourseTable";
import ReviewTable from "./ReviewTable";

export default function Table({isStudent, courses, selectedCourse, setSelectedCourse, setCurrentView}) {
    return(
        <>
                {
          isStudent && (
          <div className='main-container-body'>
            <StudentCourseTable
              courses={courses}
              selectedCourse={selectedCourse}
              onSelect={setSelectedCourse}
              setView={setCurrentView}
            />
          </div>
          )
        }
        {
          !isStudent && (
          <div className='main-container-body'>
            <ReviewTable
              courses={courses}
              selectedCourse={selectedCourse}
              onSelect={setSelectedCourse}
              setView={setCurrentView}
            />
          </div>
          )
        }
        </>
    );
}