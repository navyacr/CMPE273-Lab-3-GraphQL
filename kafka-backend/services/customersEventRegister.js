const Model = require('../models/events.model');
const CustomersModel = require('../models/customers.model');

function handle_request(msg, callback){

  let newAttendee = new Model.eventAttendeesModel(msg)
  
  console.log("New attendee is", newAttendee)

  if (!newAttendee) {
    callback(null, {message: "Not Done"})

  }
  if (!callback) {
    return newAttendee
  }

  Model.eventsModel.findOne({ _id: msg.eventId }, (error, events) => {
      if (error) {
          callback(error, {"status": "error"})
      }
      if (events) {
        CustomersModel.findById({_id: msg.customerId}, (err, customer) => {
          if (err) {
            callback(err, {"status": "Couldnt find customer Name"}) 
          }
          newAttendee.customerName = customer.name
          events.attendees.push(newAttendee)
          events.save()
          callback(null, {"status": "SUCCESS"})  
        })
        
      }
  });
}

exports.handle_request = handle_request;