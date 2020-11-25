const Model = require('../models/events.model');

function handle_request(msg, callback){

  // let newDish = new dishesModel(msg)
  
  // console.log("New dish is", newDish)

  // if (!newDish) {
  //   callback(null, {message: "Not Done"})

  // }
  // if (!callback) {
  //   return newDish
  // }
  
  Model.eventsModel.findOne({ _id: msg.eventId }, (error, event) => {
      if (error) {
          callback(error, {"status": "error"})
      }
      if (event) {
        callback(null, event)  
      }
      
  });
}

exports.handle_request = handle_request;