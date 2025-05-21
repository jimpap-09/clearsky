// controllers/eventController.js
const Grades = require('../models/Grades');
const QuestionDistribution = require('../models/QuestionDistribution');
const TotalGradeDistribution = require('../models/TotalGradesDistribution');

function parseCourseMetagrades(headerText) {
  const regex = /ΒΑΘΜΟΛΟΓΙΟ\s+(.*?)\s+\((\d+)\)\s+(.+)/;
  const match = headerText.match(regex);
  if (!match) return null;

  return {
      courseName: match[1].trim(),
      courseId: match[2].trim(),
      examPeriod: match[3].trim()
  };
}

exports.handleEvent = async (req, res) => {
  const { type, data } = req.body;
  
  console.log('Received event');
  try {
    const  { grades } = data;
    const headerText = grades[0][0]; // First cell of the first row
    const parsed = parseCourseMetagrades(headerText);
    const questionHeaders = grades[2].slice(8, 18); // Extract headers (Q01, Q02, ...) from row 1 (Column I onward)
    const scale = grades[3][5]; // Column F
    const maxGrade = parseInt(scale.split('-')[1]); // → 10
    const isFinalized = (type === 'FINAL_GRADES' ? true : false);
    const courseId = parsed.courseId;

    const parsedGrades = grades.slice(3).map(row => ({
      studentId: row[0], // Column A
      courseId: parsed.courseId,  // Column E
      examPeriod: parsed.examPeriod, // Column F
      courseName: parsed.courseName, // Column B
      totalGrade: row[6], // Column G
      perQuestion: questionHeaders.reduce((acc, q, idx) => {
        acc[q] = row[8 + idx]; // Columns I-R
        return acc;
      }, {})
    }));

    if (type === 'FINAL_GRADES') {
      await Grades.destroy({ where: { courseId } });
      await QuestionDistribution.destroy({ where: { courseId } });
      await TotalGradeDistribution.destroy({ where: { courseId } });
    }
    
    for (const grade of parsedGrades) {
      await Grades.create({
        studentId: grade.studentId,
        courseId: grade.courseId,
        examPeriod: grade.examPeriod,
        courseName: grade.courseName,
        totalGrade: grade.totalGrade,
        perQuestion: grade.perQuestion,
        isFinalized: isFinalized
      });
    }

    const questionDistributions = {};  // { Q01: { 1: count, 2: count, ... } }
    const totalGradeDistribution = {}; // { 1: count, 2: count, ... }

    // Initialize distributions
    for(let grade = 0; grade <= maxGrade; grade++) {
      totalGradeDistribution[grade] = 0;
    }
    questionHeaders.forEach(question => {
      questionDistributions[question] = {};
      for (let grade = 0; grade <= maxGrade; grade++) {
        questionDistributions[question][grade] = 0;
      }
    });

    for (const row of parsedGrades) {
      const total = row.totalGrade;
      totalGradeDistribution[total] += 1;

      for (const [question, grade] of Object.entries(row.perQuestion)) {
        questionDistributions[question][grade] += 1;
      }
    }

    for (const questionNo in questionDistributions) {
      const entries = [];
      const grades = questionDistributions[questionNo];
      for (const grade in grades) {
        entries.push({
          courseId: parsed.courseId,
          questionNo,
          examPeriod: parsed.examPeriod,
          courseName: parsed.courseName,
          grade: parseInt(grade),
          count: grades[grade]
        });
      }
      await QuestionDistribution.bulkCreate(entries);
    }

    const totalGradeEntries = [];
    for (const grade in totalGradeDistribution) {
      totalGradeEntries.push({
        courseId: parsed.courseId,
        examPeriod: parsed.examPeriod,
        courseName: parsed.courseName,
        totalGrade: parseInt(grade),
        count: totalGradeDistribution[grade]
      });
    } 
    await TotalGradeDistribution.bulkCreate(totalGradeEntries);

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
};
