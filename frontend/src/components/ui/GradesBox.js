export default function GradesBox({ course, grades }) {
  return (
    <div
      className="main-container"
      style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      // padding: '10px',
      maxWidth: '200px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h4
        className="main-container-header"
        style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
        fontWeight: 'bold'
      }}>
         My Grades-{course.name}-{course.period}
      </h4>

      {Object.entries(grades).map(([label, val]) => (
        <div
          className="main-container-body"
          key={label} 
          style={{ marginBottom: '10px' }}
        >
          <label style={{ display: 'block', marginBottom: '4px' }}>{label}</label>
          <input
            type="text"
            value={val ?? ''}
            readOnly
            style={{
              width: '100%',
              border: '2px solid gray',
              borderRadius: '6px',
              padding: '5px',
              textAlign: 'center'
            }}
          />
        </div>
      ))}
    </div>
  );
}
