// course table
export default function ReviewTable({reviews, selectedReview, onSelect, setView}) {

  if(!reviews) return null;

  console.log("Instructor Review Table: Instructor Reviews: ", reviews);
  console.log("Instructor Review Table: selectedReview's id: ", selectedReview?.id);

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
          const isSelected = selectedReview === review;
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
            }
            >
              <td>{review.name}</td>
              <td>{review.period}</td>
              <td>{review.student}</td>
              <td>
                <button
                  onClick={()=>{setView('reply'); console.log('currentView = reply')}}
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