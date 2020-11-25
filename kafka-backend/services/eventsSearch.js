const Model = require('../models/events.model');
const dishesModel = require('../models/dishes.model');
const { model } = require('../models/dishes.model');

function handle_request(msg, callback){
  Model.eventsModel.find({name : new RegExp(msg.value, 'i')})
    .then(function(output) {
      if (output) {
        console.log("search by eventname:", output)
        callback(null, output)  
      }
    });

}

exports.handle_request = handle_request;
