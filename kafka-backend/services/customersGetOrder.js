const ordersModel = require('../models/orders.model');
var mongoose = require('mongoose');

function handle_request(msg, callback){
    ordersModel.find({customerId: msg.customerId})
    .populate("dishId")
    .populate("restaurantId")
    // .populate({model: dishesModel, select: "dishes", path: "restaurant.menu"})
    .then(function(cusOrder) {
      console.log('Dish populated?', cusOrder)
      if (cusOrder) {
          callback(null, cusOrder)
      }
  });
}

exports.handle_request = handle_request;
