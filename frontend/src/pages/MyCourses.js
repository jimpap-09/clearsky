import {useState} from 'react';
import useAuth from '../context/AuthContext';
import RenderContent from '../components/ui/RenderContent';
import Table from '../components/ui/Table';

// my courses - main page
export default function MyCourses() {
  // user data
  const {userData, token} = useAuth();
  const id = userData?.id;
  const role = userData?.role;
  const email = userData?.email;
  const name = userData?.name;
  const isStudent = role === 'STUDENT';

  // states for vars:
  // selected course with different background color
  // currentView to choose what the rest of the page is
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentView, setCurrentView] = useState('');

  if (role === 'ADMIN') {
    return (
      <h1> Login as STUDENT or INSTRUCTOR to see your courses!</h1>
    )
  }

  console.log('token: ', token);
  console.log('userData', userData);
  return (
    // show a table with my courses(for student) and my reviews(for instructor)
    // render selected content according to currentView
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <div className='main-container'>
        <div className='main-container-header'>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{name}, {email}</div>
        </div>
        <Table
          id={id}
          token={token}
          isStudent={isStudent}
          selectedItem={selectedItem}
          setSelectedCourse={setSelectedItem}
          setCurrentView={setCurrentView}
        />
      </div>
      <RenderContent
        id={id}
        setSelectedItem={setSelectedItem}
        selectedItem={selectedItem}
        setCurrentView={setCurrentView}
        currentView={currentView}
        personal={true}
      />
      </div>
  );
}