require('dotenv').config();
const express = require('express');
const app = express();
const postGradesRoutes = require('./routes/postGrades');
const sequelize = require('./config/db');
const fs = require('fs');
const path = require('path');

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use('/', postGradesRoutes);

const PORT = 4001;

const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

sequelize.sync({ alter: true }) // or force: true during dev
  .then(() => {
    console.log('Database connected and synced');
    app.listen(PORT, () => {
      console.log(`Post grades service running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB connection failed:', err);
  });


