const messagesModel = require('../models/messages.model');

function handle_request(msg, callback){
  
  messagesModel.find({ customerId: msg.customerId, restaurantId: msg.restaurantId }).sort({time: 1}).then(function(messages) {
      if (messages) {
          callback(null, messages)
      }
      else {
        callback(error, {"status": "error"})
      }
  });
}

exports.handle_request = handle_request;