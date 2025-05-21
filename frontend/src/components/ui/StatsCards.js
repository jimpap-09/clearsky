// card statistics
import TotalGradeHistogram from "./TotalGradeHistogram";

export default function StatsCards({ course, courseStats, title }) {
  if (!course || !courseStats) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
        Log in or select a course to view statistics.
      </div>
    );
  }

  const totalAverages = Object.entries(courseStats).map(([grade, count]) => ({
    grade,
    count,
  }));

  console.log("totalAverages: ", totalAverages);

  return (
    <div
      style={{gap: '20px'}}
    >
      {/* Total Grades */}
      <div
        className="main-container"
        style={{
          marginBottom: '15px',
          maxWidth: '320px',
          maxHeight: '350px',
          minWidth: '280px',
          flex: '1 1 300px',
        }}
      >
        <h4 className="main-container-header">{course.name} - {course.period} - {title}</h4>
        <div className="main-container-body">
          <TotalGradeHistogram data={totalAverages} />
        </div>
      </div>
    </div>
  );
}