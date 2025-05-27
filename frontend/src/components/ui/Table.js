import StudentCourseTable from "./StudentCourseTable";
import ReviewTable from "./ReviewTable";
// table - main page
// show courses (for student) or reviews (for instructor)
export default function Table({id, token, isStudent, selectedItem, setSelectedCourse, setCurrentView}) {
    return(
        <>
        {isStudent ? (
        <div className='main-container-body'>
          <StudentCourseTable
            id={id}
            selectedCourse={selectedItem}
            onSelect={setSelectedCourse}
            setView={setCurrentView}
          />
        </div>
        ):(
        <div className='main-container-body'>
          <ReviewTable
            id={id}
            token={token}
            selectedReview={selectedItem}
            onSelect={setSelectedCourse}
            setView={setCurrentView}
          />
        </div>
      )}
        </>
    );
}