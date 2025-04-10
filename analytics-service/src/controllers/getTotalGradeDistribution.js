// controllers/distributionController.js
const TotalGradeDistribution = require('../models/TotalGradesDistribution');

exports.getTotalGradeDistribution = async (req, res) => {
  const { courseId } = req.params;

  if (!courseId) {
    return res.status(400).json({ error: 'courseId is required' });
  }

  try {
    const distributions = await TotalGradeDistribution.findAll({
      where: { courseId },
      order: [['totalGrade', 'ASC']] // Order by grade ascending
    });

    if (!distributions.length) {
      return res.status(404).json({ error: 'No grade distribution found for this course' });
    }

    // Convert to a { grade: count } object
    const result = {};
    distributions.forEach(entry => {
      result[entry.totalGrade] = entry.count;
    });

    return res.status(200).json({
      courseId,
      totalGradeDistribution: result
    });

  } catch (error) {
    console.error('Error fetching total grade distribution:', error.message);
    return res.status(500).json({ error: 'Failed to retrieve grade distribution' });
  }
};
