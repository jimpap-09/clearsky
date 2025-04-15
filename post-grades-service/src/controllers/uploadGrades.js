const multer = require('multer');
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

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

function extractHeaderCell(filePath) {
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    return rows[0]?.[0] || null;
}

function sanitizeFilename(text) {
    return text.replace(/[^\w\d-_ ()]/g, '').replace(/\s+/g, '_');
}

function renameUploadedFile(filePath, prefix, headerCell) {
    const safeFilename = `${prefix}_${sanitizeFilename(headerCell)}.xlsx`;
    const newPath = path.join(process.cwd(), 'uploads', safeFilename);
    fs.renameSync(filePath, newPath);
    return safeFilename;
}

exports.uploadInitial = async (req, res) => {
    upload(req, res, async err => {
        if (err) return res.status(400).json({ error: err.message });

        try {
            const filePath = path.join(process.cwd(), 'uploads', req.file.filename);
            const headerCell = extractHeaderCell(filePath);

            if (!headerCell) {
                fs.unlinkSync(filePath);
                return res.status(400).json({ error: 'Failed to read course metadata from file.' });
            }

            const newFilename = renameUploadedFile(filePath, 'initial', headerCell);
            res.status(200).json({ message: 'Initial grades file uploaded and renamed.', filename: newFilename });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to process uploaded file.' });
        }
    });
};

exports.uploadFinal = async (req, res) => {
    upload(req, res, async err => {
        if (err) return res.status(400).json({ error: err.message });

        try {
            const filePath = path.join(process.cwd(), 'uploads', req.file.filename);
            const headerCell = extractHeaderCell(filePath);

            if (!headerCell) {
                fs.unlinkSync(filePath);
                return res.status(400).json({ error: 'Failed to read course metadata from file.' });
            }

            const newFilename = renameUploadedFile(filePath, 'final', headerCell);
            res.status(200).json({ message: 'Final grades file uploaded and renamed.', filename: newFilename });

        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to process uploaded file.' });
        }
    });
};
