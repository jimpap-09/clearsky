// controllers/eventController.js
const Grades = require('../models/Grades');
const QuestionDistribution = require('../models/QuestionDistribution');
const TotalGradeDistribution = require('../models/TotalGradesDistribution');

exports.handleEvent = async (req, res) => {
  const { type, data } = req.body;
  
  console.log('Received event');
  try {
    const courseId = data[1][4]; // Column E
    const questionHeaders = data[0].slice(8, 18); // Extract headers (Q01, Q02, ...) from row 1 (Column I onward)
    const scale = data[1][5]; // Column F
    const maxGrade = parseInt(scale.split('-')[1]); // → 10
    const isFinalized = (type === 'FINAL_GRADES' ? true : false);

    const parsedGrades = data.slice(1).map(row => ({
      studentId: row[0], // Column A
      courseId: row[4],  // Column E
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
    // Save grades to DB
    if (gradingType === 'final') {
        await Grades.destroy({ where: { courseId } });
        await QuestionDistribution.destroy({ where: { courseId } });
        await TotalGradeDistribution.destroy({ where: { courseId } });
    }
    for (const grade of parsedGrades) {
      await Grades.create({
        studentId: grade.studentId,
        courseId: grade.courseId,
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
        if (!questionDistributions[question]) questionDistributions[question] = {};
        questionDistributions[question][grade] += 1;
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
