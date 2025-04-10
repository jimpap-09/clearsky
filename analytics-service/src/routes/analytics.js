const express = require('express');
const router = express.Router();
const { handleEvent } = require('../controllers/event');

// Receives events from the Event Bus
router.post('/events', handleEvent);

module.exports = router;
