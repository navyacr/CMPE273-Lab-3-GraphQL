const Model = require('../models/restaurants.model');

function handle_request(msg, callback){
    Model.restaurantsModel.find()
    .then(function(restaurants) {
      
      if (restaurants) {
          callback(null, restaurants)
      }
  });
}

exports.handle_request = handle_request;
