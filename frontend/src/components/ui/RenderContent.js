import PersonalGrades from "./PersonalGrades";
import ReviewRequest from "./ReviewRequest";
import ReviewStatus from "./ReviewStatus";

export default function RenderContent({id, selectedCourse, setSelectedCourse, setCurrentView, currentView, personal}) {

    function back() {
      setCurrentView('');
      setSelectedCourse('');
      console.log('currentView = empty');
      console.log('selectedCourse = null');
    }

    switch (currentView) {
      case 'grades':
        return (
          <PersonalGrades 
            studentId={id} 
            course={selectedCourse}
            personal={personal}
            onBack={back}
          />
        );
      case 'review':
        return (
          <ReviewRequest
            studentId={id}
            course={selectedCourse}
            onBack={back}
          />
        );
      case 'status':
        return (
          <ReviewStatus
            studentId={id}
            course={selectedCourse}
            onBack={back}
          />
        );
      default:
        return null;
    }
  };