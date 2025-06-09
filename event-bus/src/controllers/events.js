const axios = require('axios');
const Event = require('../models/Event');

// Define dispatch logic per event type
const EVENT_DISPATCH_MAP = {
    INITIAL_GRADES: [
        { name: 'Analytics Service', url: 'http://analytics-service:4002/events' },
        { name: 'Course Service', url: 'http://course-service:4004/events' },
        { name: 'User Service', url: 'http://user-mgmt-service:5000/events' },
    ],
    FINAL_GRADES: [
        { name: 'Analytics Service', url: 'http://analytics-service:4002/events' },
        { name: 'Course Service', url: 'http://course-service:4004/events' },
        { name: 'User Service', url: 'http://user-mgmt-service:5000/events' },
    ],
    REVIEW_REQUEST: [
        { name: 'Course Service', url: 'http://course-service:4004/events' },
    ],
    REVIEW_RESPONSE: [
        { name: 'Course Service', url: 'http://course-service:4004/events' },
    ],
    FETCH_USERS_BY_IDS: [
        { name: 'User Management Service', url: 'http://user-mgmt-service:5000/events' },
    ],
    FETCH_COURSES_BY_IDS: [
        { name: 'Course Service', url: 'http://course-service:4004/events' },
    ],
    // Add future event types here as needed
};

exports.receiveEvent = async (req, res) => {
const event = req.body;

    try {
        // Save the incoming event to DB
        await Event.create({
            type: event.type,
            data: event.data,
        });

        const subscribers = EVENT_DISPATCH_MAP[event.type] || [];

        const responses = [];

        for (let subscriber of subscribers) {
            try {
                const { data } = await axios.post(subscriber.url, event);
                console.log(`✅ Sent to ${subscriber.name}`);
                responses.push({
                    service: subscriber.name,
                    response: data
                });
            } catch (err) {
                console.error(`❌ Could not notify ${subscriber.name}: ${err.message}`);
                responses.push({
                    service: subscriber.name,
                    error: err.message
                });
            }
        }

        console.log(`✅ Event dispatched: ${event.type}`);
        res.status(200).send({
            status: 'Event received and dispatched',
            eventType: event.type,
            results: responses
        });

    } catch (err) {
        console.error('❌ Event handling failed:', err.message);
        res.status(500).send({ error: 'Event handling failed' });
    }};
