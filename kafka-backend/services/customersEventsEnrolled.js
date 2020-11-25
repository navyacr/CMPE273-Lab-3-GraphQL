const Model = require('../models/events.model');
var mongoose = require('mongoose');

function handle_request(msg, callback){
    Model.eventsModel.find({ "attendees": {
      $elemMatch: {"customerId": msg.customerId}}})
      // customerId: msg.customerId})
    .then(function(customers) {
      if (customers) {
          console.log("Parent:", customers)

          // Parent.findOne({ 'children': { 
          //   $elemMatch: { 'field': 'Family Name', 'value': 'Smith' } } }, fn ...)
          callback(null, customers)
      }
      else{
        callback(null, {"status": "No Registrations"})  
      }
  });
}

exports.handle_request = handle_request;
