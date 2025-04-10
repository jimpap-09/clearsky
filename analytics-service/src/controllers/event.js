// controllers/eventController.js
const { Grades } = require('../models/Grades');
const { QuestionDistribution } = require('../models/QuestionDistribution');
const { totalGradeDistribution} = require('../models/TotalGradeDistribution');

exports.handleEvent = async (req, res) => {
  const { type, data } = req.body;

  if (type === 'GRADES_ANALYTICS') {
    try {
      const courseId = data[0][4]; // Column E
      const parsedGrades = data.map(row => ({
        studentId: row[0], // Column A
        courseId: row[4],  // Column E
        totalGrade: row[6], // Column G
        perQuestion: questionHeaders.reduce((acc, q, idx) => {
          acc[q] = row[8 + idx]; // Columns I-R
          return acc;
        }, {})
      }));
      

      // Extract relevant columns (A-G)
      /* const gradeRows = dataRows.map(row => row.slice(0, 7)); // A-G (Student ID, Name, Email, Period, Course Name, Scale, Grade)
      for (const row of gradeRows) {

          //TODO: Handle validation
          if (row.length < 7) continue; // Skip incomplete rows

          const [
              studentId,
              name,
              email,
              period,
              courseName,
              scale,
              grade
          ] = row;

          // Skip if any important field is missing
          if (!studentId || !grade) continue;

          gradesToSend.push({
              studentId,
              name,
              email,
              grade: parseFloat(grade),
              courseId
          });
      }
     */
      // Save grades to DB
      for (const grade of parsedGrades) {
        await Grades.create({
          studentId: grade.studentId,
          courseId: grade.courseId,
          totalGrade: grade.totalGrade,
          perQuestion: grade.perQuestion
        });
      }

      const questionDistributions = {};  // { Q01: { 1: count, 2: count, ... } }
      const totalGradeDistribution = {}; // { 1: count, 2: count, ... }

      for (const row of parsedGrades) {
        const total = row.totalGrade;
        totalGradeDistribution[total] = (totalGradeDistribution[total] || 0) + 1;

        for (const [question, grade] of Object.entries(row.perQuestion)) {
          if (!questionDistributions[question]) questionDistributions[question] = {};
          questionDistributions[question][grade] = (questionDistributions[question][grade] || 0) + 1;
        }
      }

      for (const question in questionDistributions) {
        const entries = [];
        for (const questionNo in questionDistributions[courseId]) {
          const grades = questionDistributions[questionNo];
          for (const grade in grades) {
            entries.push({
              courseId,
              questionNo,
              grade: parseInt(grade),
              count: grades[grade]
            });
          }
        }
        await QuestionDistribution.bulkCreate(entries);
      }

      const totalGradeEntries = [];
      for (const grade in totalGradeDistribution) {
        totalGradeEntries.push({
        courseId,
        totalGrade: parseInt(grade),
        count: totalGradeDistribution[grade]
      });
}
      // For now, just log them or return
      console.log('📊 Final Grade Distribution:', totalGradeDistribution);
      console.log('📊 Per-Question Distribution:', questionDistributions);

      return res.status(200).json({
        message: 'Grades processed and distributions calculated.',
        totalGradeDistribution,
        questionDistributions
      });
    } catch (error) {
      console.error('Analytics Error:', error.message);
      res.status(500).json({ error: 'Failed to process grades.' });
    }
  } else {
    res.status(200).send({ status: 'Event ignored by analytics service.' });
  }
};
