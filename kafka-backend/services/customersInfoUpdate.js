const customersModel = require('../models/customers.model');
var mongoose = require('mongoose');


function handle_request(msg, callback){
   
    console.log("Inside customersProfile update kafka backend");
    console.log(msg);

  customersModel.findByIdAndUpdate(msg._id, msg, { safe: true, new: true, useFindAndModify: false }, function(error, customer) {
      
      if (error) {
          callback(error, {"status": "error"})
      }
      if (customer) {
          console.log("customer updated")
          callback(null, customer)
      }
  });
}

exports.handle_request = handle_request;
