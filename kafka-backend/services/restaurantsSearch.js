const Model = require('../models/restaurants.model');
const dishesModel = require('../models/dishes.model');
const mongoose = require('mongoose');

function handle_request(msg, callback){
  console.log("Msg type is:", msg.type)
  if (msg.type === 'dishname'){
    dishesModel.find({ name: msg.value })
    .populate('restaurantId')
    .then(function(output) {
      if (output) {
        var returnThis = []
        for (var i in output) {
          returnThis.push(output[i].restaurantId)
        }
        callback(null, returnThis)  
      }
  });
  }
  if (msg.type === 'restaurantname'){
    Model.restaurantsModel.find({ name : new RegExp(msg.value, 'i')})
    .then(function(output) {
      if (output) {
        console.log("search by res name:", output)
        callback(null, output)  
      }
    });
  }

  if (msg.type === 'location'){
    Model.restaurantsModel.find({ location : new RegExp(msg.value, 'i')})
    .then(function(output) {
      if (output) {
        console.log("search by location:", output)
        callback(null, output)  
      }
    });
  }

  if (msg.type === "cuisine" || msg.type === "deliverymode") {
  Model.restaurantsModel.find({[msg.type] : new RegExp(msg.value, 'i')})
    .then(function(output) {
      if (output) {
        console.log("search by cuisine or deliverymode:", output)
        callback(null, output)  
      }
    });
  }
}

exports.handle_request = handle_request;
