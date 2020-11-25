const dishesModel = require('../models/dishes.model');

function handle_request(msg, callback){

  // let newDish = new dishesModel(msg)
  
  // console.log("New dish is", newDish)

  // if (!newDish) {
  //   callback(null, {message: "Not Done"})

  // }
  // if (!callback) {
  //   return newDish
  // }
  
  dishesModel.find({ restaurantId: msg.restaurantId }, (error, dishes) => {
      if (error) {
          callback(error, {"status": "error"})
      }
      if (dishes) {
        callback(null, dishes)  
      }
      
  });
}

exports.handle_request = handle_request;