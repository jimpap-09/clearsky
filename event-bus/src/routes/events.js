const express = require('express');
const eventsController = require('../controllers/events');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/events', 
    eventsController.receiveEvent);

//router.get('/', eventsController.getEvents);

module.exports = router;
