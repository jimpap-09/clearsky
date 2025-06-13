const express = require('express');
// const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs');
const router = express.Router();
const auth = require('../controllers/auth');
const events = require('../controllers/events');

router.post('/events', events.handleEvent);
router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/getUsersByIds/:ids', auth.getUsersByIds);
router.get('/getUsers/', auth.getUsers);
router.put('/change-password', auth.changePassword);

module.exports = router;
