require('dotenv').config();
const express = require('express');
const app = express();
const analyticsRoutes = require('./routes/analytics');
const sequelize = require('./config/db');

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use('/', analyticsRoutes);

const PORT = 4002;

sequelize.sync({ alter: true }) // or force: true during dev
    .then(() => {
        console.log('Database connected and synced');
        app.listen(PORT, () => {
            console.log(`Analytics service running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('DB connection failed:', err);
    });
