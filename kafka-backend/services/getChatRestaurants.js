const restaurantsModel = require('../../backend/models/restaurants.model');
const messagesModel = require('../models/messages.model');
const Model = require('../models/restaurants.model');

function handle_request(msg, callback){
  
  messagesModel.find({ customerId: msg.customerId })
  // .populate('restaurantId')
  .distinct('restaurantId')
  .then(function(ids) {
      if (ids) {
        Model.restaurantsModel.find({'_id':{$in : ids}},function(err,result) {
          console.log("Restaurants list:", result)
          callback(null, result);
        });
      }
      else {
        callback(error, {"status": "error"})
      }
  });
}

exports.handle_request = handle_request;