// controllers/analyticsController.js
const QuestionDistribution = require('../models/QuestionDistribution');

exports.getQuestionDistribution = async (req, res) => {
    const { courseId } = req.params;

    try {
        const raw = await QuestionDistribution.findAll({
        where: { courseId },
        order: [['questionNo', 'ASC'], ['grade', 'ASC']]
    });

        const distribution = {};

        raw.forEach(({ questionNo, grade, count }) => {
            if (!distribution[questionNo]) distribution[questionNo] = {};
            distribution[questionNo][grade] = count;
        });

        return res.status(200).json(distribution);
    } catch (err) {
        console.error('Error fetching question distribution:', err.message);
        return res.status(500).json({ error: 'Failed to get question distribution' });
    }
};
