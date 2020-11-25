const customersModel = require('../models/customers.model');

function handle_request(msg, callback){
  customersModel.find()
    // .populate("customerId")
    // .populate("dishId")
    .then(function(allcus) {
      
      if (allcus) {
          callback(null, allcus)
      }
  });
}

exports.handle_request = handle_request;
