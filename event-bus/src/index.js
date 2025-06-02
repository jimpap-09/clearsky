const express = require('express');
require('dotenv').config();

const sequelize = require('./config/db');
const eventsRoutes = require('./routes/events');

const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use('/', eventsRoutes);

const PORT = 4005;

sequelize.sync() // or force: true during dev
  .then(() => {
    console.log('Database connected and synced');
    app.listen(PORT, () => {
      console.log(`event bus running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB connection failed:', err);
  });

