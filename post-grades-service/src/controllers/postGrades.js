const multer = require('multer');
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(process.cwd(), 'uploads')),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const fileFilter = (req, file, cb) => {
    path.extname(file.originalname) === '.xlsx'
        ? cb(null, true)
        : cb(new Error('Only XLSX files are allowed'), false);
};

const upload = multer({ storage, fileFilter }).single("file");

exports.postInitial = async (req, res) => {
    upload(req, res, async err => {
        console.log('📁 Uploaded file:', req.file);
        if (err) return res.status(400).json({ error: err.message });

        try {
            const { courseId } = req.body;
            const filePath = path.join(process.cwd(), 'uploads', req.file.filename);
            const workbook = xlsx.readFile(filePath);
            const sheet = workbook.Sheets[workbook.SheetNames[0]];

            // Get sheet as array of rows
            const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });

            // TODO: validation
            const headers = rows[2]; // Assuming actual headers are on row 3
            const questionHeaders = headers.slice(8, 18); // I-R (Q01-Q10)
            if (!questionHeaders.includes("Q01")) {
                return res.status(400).json({ error: 'Invalid file format or missing headers.' });
            }

            const dataRows = rows.slice(2); 
            
            console.log('Sending data to event bus');
            // Send event to event bus
            // Send parsed grades to event bus for analytics
            await axios.post('http://localhost:4005/events', {
                type: 'INITIAL_GRADES',
                data: dataRows,
            });

            console.log('Grades sent to Event Bus:', dataRows);
            fs.unlinkSync(filePath); // Clean up uploaded file
            return res.status(200).json({ message: 'Grades parsed and sent to Event Bus' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to process grades file' });
        }
    });
};

exports.postFinal = async (req, res) => {
    upload(req, res, async err => {
        console.log('📁 Uploaded file:', req.file);
        if (err) return res.status(400).json({ error: err.message });

        try {
            const { courseId } = req.body;
            const filePath = path.join(process.cwd(), 'uploads', req.file.filename);
            const workbook = xlsx.readFile(filePath);
            const sheet = workbook.Sheets[workbook.SheetNames[0]];

            // Get sheet as array of rows
            const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });

            // TODO: validation
            const headers = rows[2]; // Assuming actual headers are on row 3
            const questionHeaders = headers.slice(8, 18); // I-R (Q01-Q10)
            if (!questionHeaders.includes("Q01")) {
                return res.status(400).json({ error: 'Invalid file format or missing headers.' });
            }

            const dataRows = rows.slice(2); 
            
            console.log('Sending data to event bus');
            // Send event to event bus
            // Send parsed grades to event bus for analytics
            await axios.post('http://localhost:4005/events', {
                type: 'FINAL_GRADES',
                data: dataRows,
            });

            console.log('Grades sent to Event Bus:', dataRows);
            fs.unlinkSync(filePath); // Clean up uploaded file
            return res.status(200).json({ message: 'Grades parsed and sent to Event Bus' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to process grades file' });
        }
    });
};
