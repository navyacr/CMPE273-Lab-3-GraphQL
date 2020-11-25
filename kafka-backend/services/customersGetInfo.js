const customersModel = require('../models/customers.model');
var mongoose = require('mongoose');

function handle_request(msg, callback){
  customersModel.findById(msg._id, function(error, customer) {
      if (error) {
          callback(error, {"status": "error"})
      }
      if (customer) {
          callback(null, customer)
      }
  });
}

exports.handle_request = handle_request;
