import Grades from "./Grades";
import ReviewRequest from "./ReviewRequest";
import ReviewStatus from "./ReviewStatus";
import Reply from "./Reply";

// RenderContext - main page
export default function RenderContent({id, selectedItem, setSelectedItem, setCurrentView, currentView, personal}) {

  // func to unrender the content and show only the table
  // so we set currentView and selectedCourse to empty
    function back() {
      setCurrentView('');
      setSelectedItem('');
      console.log('currentView = empty');
      console.log('selectedCourse = null');
    }

    // according to currentView
    // show for student: grades, create review, review status
    // for instructor: reply to reviews, 
    switch (currentView) {
      case 'grades':
        return (
          <Grades
            userId={id}
            course={selectedItem}
            personal={personal}
            onBack={back}
          />
        );

      case 'review':
        return (
          <ReviewRequest
            studentId={id}
            course={selectedItem}
            onBack={back}
          />
        );

      case 'status':
        return (
          <ReviewStatus
            studentId={id}
            course={selectedItem}
            onBack={back}
          />
        );

      case 'reply':
        return (
          <Reply
            review={selectedItem}
            onBack={back}
          />
        );

      default:
        return null;
    }
  };