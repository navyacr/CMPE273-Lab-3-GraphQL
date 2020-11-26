const dishesModel = require("../models/dishes.model");

function handle_request(msg, callback) {
  dishesModel.find({ restaurantId: msg.restaurantId }, (error, dishes) => {
    if (error) {
      callback(error, { status: "error" });
    }
    if (dishes) {
      callback(null, dishes);
    }
  });
}

exports.handle_request = handle_request;
