const dishesModel = require('../models/dishes.model');

function handle_request(msg, callback){

  let newDish = new dishesModel(msg)
  
  console.log("New dish is", newDish)

  if (!newDish) {
    callback(null, {message: "Not Done"})

  }
  if (!callback) {
    return newDish
  }
  
  dishesModel.findOne({ name: msg.name }, (error, dish) => {
      if (error) {
          callback(error, {"status": "error"})
      }
      if (dish) {
        dish.update(msg)
        dish.save()
        callback(null, {"status": "Updated", "dish": dish})  
      }
      else{
        newDish.save(function(err, dish){
          if (dish){
            callback(null, dish)
          }
          else{
            callback(null, {"status": err})

          }
        })
      }
  });
}

exports.handle_request = handle_request;