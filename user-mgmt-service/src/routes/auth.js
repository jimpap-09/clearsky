const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const auth = require('../controllers/auth');
const authMiddleware = require('../middleware/auth');
const requireRole = require('../middleware/roles');
const events = require('../controllers/events');

router.post('/events', events.handleEvent);
router.post('/register',
    auth.register);

router.post('/login', auth.login);

module.exports = router;
