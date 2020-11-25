const dishesModel = require('../models/dishes.model');

function handle_request(msg, callback){
    if (msg) {
        console.log("filename:", msg)
        
        dishesModel.findByIdAndUpdate(msg.id, {filename: msg.filename }, { safe: true, new: true, useFindAndModify: false }, function(error, dish){
          if (error) {
            callback(error, {"status": "error"})
          }
          if (dish) {
            console.log("Image updated")
            callback(null, dish)
          }
        });
      } else {
        callback(error, {"status": "error"})
      }
}

exports.handle_request = handle_request;
