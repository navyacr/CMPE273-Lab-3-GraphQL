const ordersModel = require('../models/orders.model');
var mongoose = require('mongoose');

function handle_request(msg, callback){
    ordersModel.find({restaurantId: msg.restaurantId})
    .populate("customerId")
    .populate("dishId")
    .then(function(resOrder) {
      
      if (resOrder) {
          callback(null, resOrder)
      }
  });
}

exports.handle_request = handle_request;
