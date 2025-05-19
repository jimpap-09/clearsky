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

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('📦 DB connected & synced');
    console.log(`🚀 Event Bus running on port ${PORT}`);
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
  }
});
