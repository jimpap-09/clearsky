import { useEffect, useState } from 'react';
// import { fetchInstructorReviewRequests } from '../../api/reviews';
import { fetchInstructorPendingReviewRequests } from '../../api/reviews';

// review table
export default function ReviewTable({id, token, selectedReview, onSelect, setView}) {
  
  const [reviews, setReviews] = useState([]);
  // fetch all student courses
  useEffect(() => {
    const loadReviews = async () => {
      // const data = await fetchInstructorReviewRequests(id, token);
      const data = await fetchInstructorPendingReviewRequests(id, token);
      setReviews(data);
    };
    if(id) loadReviews();
  }, [id, token]);

  if(!reviews || reviews.length === 0) return (
    <h2>
      You don't have any pending Grade Review Requests!
    </h2>
  );

  console.log("Reviews: ", reviews);
  console.log("selectedReview's id: ", selectedReview?.id);

  return (
    <table border="1" cellPadding="8" style={{ width: '100%', marginBottom: '20px' }}>
      <thead>
        <tr style={{ backgroundColor: '#f0f0f0' }}>
          <th>course name</th>
          <th>exam period</th>
          <th>student</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
        {reviews.map((review, index) => {
          const isSelected = selectedReview?.id === review?.id;
          return (
            <tr
              key={index}
              onClick={() => onSelect(review)}
              style={{
                cursor: 'pointer',
                backgroundColor: isSelected ? '#cce5ff' : undefined,
                textAlign: 'center'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e6f0ff')}
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = isSelected ? '#cce5ff' : '')
              }>
              <td>{review.courseName}</td>
              <td>{review.coursePeriod}</td>
              <td>{review.studentId}</td>
              <td>
                <button
                  className='main-button'
                  onClick={(e) => {
                    e.stopPropagation(); // prevent row click
                    onSelect(review);
                    setView('reply');
                    console.log('currentView = reply');
                  }}
                >
                Reply
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}