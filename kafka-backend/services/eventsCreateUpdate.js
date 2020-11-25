const Model = require('../models/events.model');

function handle_request(msg, callback){
  console.log("New msg is", msg)

  let newEvent = new Model.eventsModel(msg)
  
  console.log("New Event is", newEvent)

  if (!newEvent) {
    callback(null, {message: "Not Done"})

  }
  if (!callback) {
    return newEvent
  }
  
  Model.eventsModel.findOne({ name: msg.name }, (error, event) => {
      if (error) {
          callback(error, error)
      }
      if (event) {
        event.update(msg)
        event.save()
        callback(null, event)  
      }
      else{
        newEvent.save()
        callback(null, newEvent)
      }
  });
}

exports.handle_request = handle_request;