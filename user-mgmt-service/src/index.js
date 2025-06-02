require('dotenv').config();
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const sequelize = require('./config/db');

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use('/', authRoutes);

const PORT = 5000;

sequelize.sync() // or force: true during dev
  .then(() => {
    console.log('Database connected and synced');
    app.listen(PORT, () => {
      console.log(`User service running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB connection failed:', err);
  });
