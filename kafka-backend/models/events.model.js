const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var eventAttendeesSchema = new Schema({
    customerId: {type: ObjectId},
    customerName: {type: String}

})
var eventsSchema = new Schema({
   name: {type: String},
   description: {type: String},
   date: {type: Date},
   time: {type: String},
   location: {type: String},
   hashtags: {type: String},
   attendees: [eventAttendeesSchema]
},
{
    versionKey: false
});


const eventsModel = mongoose.model('events', eventsSchema);
const eventAttendeesModel = mongoose.model('attendees', eventAttendeesSchema);
module.exports = {
    eventsModel: eventsModel,
    eventAttendeesModel: eventAttendeesModel
}