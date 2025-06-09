require('dotenv').config();
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const sequelize = require('./config/db');
const User = require('./models/User');
const cors = require('cors');
const bcrypt = require('bcryptjs');
app.use(cors());

app.use(express.json());
app.use('/', authRoutes);

const PORT = 5000;

// Function to create an admin user if it doesn't exist
const createAdmin = async () => {
  try {
    const adminExists = await User.findOne({ where: { role: 'ADMIN' } });
    const hash = await bcrypt.hash('admin123', 10);
    if (!adminExists) {
      await User.create({
        id: 'admin',
        email: 'admin',
        passwordHash: hash,
        role: 'ADMIN',
        name: 'Mitsos'
      });
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

sequelize.sync() // or force: true during dev
  .then(async () => {
    console.log('Database connected and synced');
    await createAdmin();
    app.listen(PORT, () => {
      console.log(`User service running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB connection failed:', err);
  });
