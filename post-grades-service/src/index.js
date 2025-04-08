require('dotenv').config();
const express = require('express');
const app = express();
const postGradesRoutes = require('./routes/postGrades');
const sequelize = require('./config/db');

app.use(express.json());
app.use('/api/postGrades', postGradesRoutes);

const PORT = process.env.PORT || 3000;

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
