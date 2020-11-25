const Model = require('../models/restaurants.model');
var mongoose = require('mongoose');

function handle_request(msg, callback){
    Model.restaurantsModel.findById(msg._id, function(error, restaurant) {
      
      if (error) {
          callback(error, {"status": "error"})
      }
      if (restaurant) {
          callback(null, restaurant)
      }
  });
}

exports.handle_request = handle_request;
