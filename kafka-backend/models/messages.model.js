const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var messagesSchema = new Schema({
    customerId: {type: ObjectId, ref: "customers"},
    restaurantId: {type: ObjectId, ref: "restaurants"},
    time: { type: Date, default: Date.now},
    message: { type: String},
    senderType: { type: String},
},
{
    versionKey: false
});

const messagesModel = mongoose.model('messages', messagesSchema);
module.exports = messagesModel;