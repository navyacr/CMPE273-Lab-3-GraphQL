const ordersModel = require('../models/orders.model');

function handle_request(msg, callback){
    ordersModel.findByIdAndUpdate({_id : msg.orderId }, msg, { safe: true, new: true, useFindAndModify: false }, function(error, order) {
      if (error) {
          callback(error, {"status": "error"})
      }
      if (order) {
          callback(null, order)
      }
  });
}

exports.handle_request = handle_request;
