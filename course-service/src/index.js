require('dotenv').config();
const express = require('express');
const app = express();
const coursesRoutes = require('./routes/courses');
const sequelize = require('./config/db');

app.use(express.json());
app.use('/', coursesRoutes);

const PORT = process.env.PORT;

sequelize.sync({ alter: true }) // or force: true during dev
  .then(() => {
    console.log('Database connected and synced');
    app.listen(PORT, () => {
      console.log(`Courses service running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB connection failed:', err);
  });
