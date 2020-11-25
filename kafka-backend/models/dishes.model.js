const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var dishesSchema = new Schema({
   name: {type: String},
   restaurantId: {type: ObjectId, ref: "restaurants"},
   ingredients: {type: String},
   decsription: {type: String},
   price: {type: String},
   category: {type: String},
   filename: {type: String}
},
{
    versionKey: false
});


const dishesModel = mongoose.model('dishes', dishesSchema);
module.exports = dishesModel;