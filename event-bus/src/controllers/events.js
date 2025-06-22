const axios = require('axios');
const Event = require('../models/Event');

// Define dispatch logic per event type
const EVENT_DISPATCH_MAP = {
    INITIAL_GRADES: [
        { name: 'Analytics Service', url: 'http://analytics-service:4002/events' },
        { name: 'Course Service', url: 'http://course-service:4004/events' },
        { name: 'User Service', url: 'http://user-mgmt-service:5000/events' },
        { name: 'Review Request Service', url: 'http://review-request-service:4003/events' },
    ],
    FINAL_GRADES: [
        { name: 'Analytics Service', url: 'http://analytics-service:4002/events' },
        { name: 'Course Service', url: 'http://course-service:4004/events' },
        { name: 'User Service', url: 'http://user-mgmt-service:5000/events' },
        { name: 'Review Request Service', url: 'http://review-request-service:4003/events' },
    ],
    REVIEW_REQUEST: [
        {
            name: 'Course Service',
            url: 'http://course-service:4004/events', 
        },
    ],
    REVIEW_RESPONSE: [
        {
            name: 'Course Service',
            url: 'http://course-service:4004/events', 
        },
    ],
};

exports.receiveEvent = async (req, res) => {
    const event = req.body;

    try {
        // Save event to the DB
        await Event.create({
            type: event.type,
            data: event.data,
        });

        const subscribers = EVENT_DISPATCH_MAP[event.type] || [];

        // Send event only to its designated subscribers
        for (let subscriber of subscribers) {
            try {
                await axios.post(subscriber.url, event);
                console.log(`✅ Sent to ${subscriber.name}`);
            } catch (err) {
                console.error(`❌ Could not notify ${subscriber.name}: ${err.message}`);
            }
        }

        console.log(`✅ Event dispatched: ${event.type}`);
        res.status(200).send({ status: 'Event received and dispatched' });
    } catch (err) {
        console.error('❌ Event handling failed:', err.message);
        res.status(500).send({ error: 'Event handling failed' });
    }
};

