const Model = require('../models/restaurants.model');

function handle_request(msg, callback){
  Model.restaurantsModel.findByIdAndUpdate(msg._id, msg, { safe: true, new: true, useFindAndModify: false }, function(error, restaurant) {
      if (error) {
          callback(error, {"status": "error"})
      }
      if (restaurant) {
          callback(null, restaurant)
      }
  });
}

exports.handle_request = handle_request;
