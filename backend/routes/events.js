const express = require("express");
const app = express.Router();
const events = require("../controllers/events.controller.js");
const eventAttendees = require("../controllers/eventAttendees.controller.js");

app.post('/info', events.create)
app.get('/info', events.findAll)
app.post('/eventsearch', events.search)

app.post('/:eventId/attendees', events.register)
app.get('/:eventId/attendees', events.findAttendees)
app.get('/:customerId/eventList', events.customerEvents)



module.exports = app;
