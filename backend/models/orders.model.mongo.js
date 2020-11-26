const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ordersSchema = new Schema({
    customerId: {type: ObjectId, ref: "customers"},
    restaurantId: {type: ObjectId, ref: "restaurants"},
    dishId: {type: ObjectId, ref: "dishes"},
    qty: { type: String},
    dm: { type: String},
    status: { type: String},
    date: {type: Date, default: Date.now},
},
{
    versionKey: false
});

const ordersModel = mongoose.model('orders', ordersSchema);
module.exports = ordersModel;