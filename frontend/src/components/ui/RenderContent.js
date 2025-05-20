import PersonalGrades from "./PersonalGrades";

export default function RenderContent({id, selectedCourse, setCurrentView, currentView}) {
    switch (currentView) {
      case 'grades':
        return (
          <PersonalGrades 
            studentId={id} 
            course={selectedCourse} 
            onBack={() => {setCurrentView(''); console.log('currentView = empty');}}
          />
        );
      case 'review':
        return <div>Review Request Page (Component to be added)</div>;
      case 'status':
        return <div>Review Status Page (Component to be added)</div>;
      default:
        return null;
    }
  };