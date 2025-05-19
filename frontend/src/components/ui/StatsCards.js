// card statistics
import TotalGradeHistogram from "./TotalGradeHistogram";

export default function StatsCards({ course, courseStats, title }) {
  if (!course || !courseStats) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
        Select a course to view statistics.
      </div>
    );
  }

  const course_name = course.name;
  const base = course_name.charAt(0).toUpperCase() + course_name.slice(1);

  const totalAverages = Object.entries(courseStats).map(([grade, count]) => ({
    grade,
    count,
  }));

  console.log("totalAverages: ", totalAverages);

  return (
    <div
      style={{display: 'grid', gap: '20px'}}
    >
      {/* Total Grades */}
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '10px',
          marginBottom: '30px',
          marginTop: '30px',
          // backgroundColor: '#f0f8ff',
          minWidth: '500px',
          maxWidth: '900px',
        }}
      >
        <h4>{base} - {title}</h4>
        <TotalGradeHistogram data={totalAverages} />
      </div>
    </div>
  );
}