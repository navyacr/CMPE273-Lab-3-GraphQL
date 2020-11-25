const Model = require('../models/restaurants.model');
var mongoose = require('mongoose');

function handle_request(msg, callback){
    Model.restaurantsModel.findOne({_id: msg.restaurantId})
    // // .populate("dishId")
    // // .populate("restaurantId")
    // // .populate({model: dishesModel, select: "dishes", path: "restaurant.menu"})
    .then(function(resData) {
      // console.log('Res data', resData)
  

      Model.restaurantsModel.aggregate([
        // {"$match" : {"_id" : "5f9de709afd6735804d51a4a"}},
        { "$addFields": {
          // _id: msg.restaurantId,
            "totalRating": {
                "$sum": "$reviews.rating"
            },
            "Average": {
              "$avg": "$reviews.rating"
            }
        } },
    ]).then(function(value) {
      console.log("VAlue: ", value)
      for (var i in value) {
        console.log("i", value[i]._id)
        console.log(msg.restaurantId)
        if (value[i]._id === msg.restaurantId) {
          callback(null, value[i])
        }
      }
      // console.log("ResDAta:", resData.totalthings)
    callback(null, {"status": "error"})
    })
    

  });
}

exports.handle_request = handle_request;
