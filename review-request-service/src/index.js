require('dotenv').config();
const express = require('express');
const app = express();
const reviewRequestRoutes = require('./routes/reviewRequest');
const sequelize = require('./config/db');

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use('/', reviewRequestRoutes);

const PORT = 4003;

sequelize.sync({ alter: true }) // or force: true during dev
  .then(() => {
    console.log('Database connected and synced');
    app.listen(PORT, () => {
      console.log(`Review Request service running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB connection failed:', err);
  });


