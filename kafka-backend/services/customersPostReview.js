const CustomersModel = require('../models/customers.model');
const Model = require('../models/restaurants.model');

function handle_request(msg, callback){

  let newReview = new Model.reviewModel(msg)
  
  console.log("New review is", newReview)

  if (!newReview) {
    callback(null, {message: "Not Done"})

  }
  if (!callback) {
    return newReview
  }

  Model.restaurantsModel.findOne({ _id: msg.restaurantId }, (error, restaurant) => {
      if (error) {
          callback(error, {"status": "error"})
      }
      if (restaurant) {
        CustomersModel.findById({_id: msg.customerId}, (err, customer) => {
          if (err) {
            callback(err, {"status": "Couldnt find customer Name"}) 
          }
          newReview.customerName = customer.name
          restaurant.reviews.push(newReview)
          restaurant.save()
          callback(null, {"status": "SUCCESS"})  
        })
        
      }
  });
}

exports.handle_request = handle_request;