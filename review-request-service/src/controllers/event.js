const Course = require('../models/Course');

// receive course name, id and period from the title of xlsx
function parseCourseMetadata(headerText) {
    const regex = /ΒΑΘΜΟΛΟΓΙΟ\s+(.*?)\s+\((\d+)\)\s+(.+)/;
    const match = headerText.match(regex);
    if (!match) return null;

    return {
        courseName: match[1].trim(),
        courseId: match[2].trim(),
        examPeriod: match[3].trim(),
    };
}

exports.handleEvent = async (req, res) => {
    const {type, data} = req.body;

    try {
        const { instructorId, grades } = data;
        const headerText = grades[0][0]; // First cell of the first row
        const metadata = parseCourseMetadata(headerText);

        if (!metadata) {
            return res.status(400).json({ error: 'Could not parse course metadata.' });
        }

        const { courseId, courseName, examPeriod } = metadata;
        console.log('Exam Period:', examPeriod);

        // Check if the course exists, if not create it
        let course = await Course.findByPk(courseId);
        if (!course) {
            course = await Course.create({
                courseId: courseId,
                courseName: courseName,
                period: examPeriod,
            });
        }

        console.log("Course created/updated:", course);
        res.status(200).json({ message: 'Course created/updated and students enrolled successfully.' });
    } catch (error) {
        console.error('Error handling event:', error);
        res.status(500).json({ message: 'Error handling event' });
    }
}