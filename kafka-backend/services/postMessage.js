const messagesModel = require('../models/messages.model');

function handle_request(msg, callback){
  
  let newMessage = new messagesModel(msg)
  newMessage.save()
  callback(null, {"status":"SUCCESS"})
}

exports.handle_request = handle_request;