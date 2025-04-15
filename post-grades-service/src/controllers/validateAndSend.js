const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const axios = require('axios');

function parseCourseMetadata(headerText) {
    const regex = /ΒΑΘΜΟΛΟΓΙΟ\s+(.*?)\s+\((\d+)\)\s+(.+)/;
    const match = headerText.match(regex);
    if (!match) return null;

    return {
        courseName: match[1].trim(),
        courseId: match[2].trim(),
        examPeriod: match[3].trim()
    };
}

exports.validateAndSend = async (req, res) => {
    try {
        const { courseId, courseName, examPeriod, numGrades } = req.body;
        const uploadsDir = path.join(process.cwd(), 'uploads');

        // 🔍 Find file that includes the courseId
        const fileName = fs.readdirSync(uploadsDir)
            .find(name => name.includes(courseId));
        if (!fileName) return res.status(404).json({ error: 'Uploaded file not found.' });

        const filePath = path.join(uploadsDir, fileName);

        // 🧠 Determine grade type from filename
        const isFinal = fileName.startsWith('final_');
        const eventType = isFinal ? 'FINAL_GRADES' : 'INITIAL_GRADES';

        // 📄 Parse the file
        const workbook = xlsx.readFile(filePath);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });

        const headerCell = rows[0]?.[0];
        if (!headerCell) {
            fs.unlinkSync(filePath);
            return res.status(400).json({ error: 'Missing metadata in first cell of the file.' });
        }

        const parsed = parseCourseMetadata(headerCell);
        if (!parsed) {
            fs.unlinkSync(filePath);
            return res.status(400).json({ error: 'Failed to parse course metadata from file.' });
        }

        // ✅ Validate metadata
        if (
            parsed.courseId !== courseId ||
            parsed.courseName !== courseName ||
            parsed.examPeriod !== examPeriod
        ) {
            return res.status(400).json({
                error: 'Metadata mismatch between file and request body.',
                file: parsed,
                body: { courseId, courseName, examPeriod }
            });
        }

        if (rows.length - 3 !== Number(numGrades)) {
            return res.status(400).json({
                error: `Expected ${numGrades} grades, but found ${rows.length - 3}.`
            });
        }
        
        // 🚀 Send to Event Bus
        await axios.post('http://localhost:4005/events', {
            type: eventType,
            data: rows
        });

        // 🧹 Cleanup
        fs.unlinkSync(filePath);

        res.status(200).json({ message: `${eventType} validated and sent to event bus.` });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to validate and send grades.' });
    }
};
