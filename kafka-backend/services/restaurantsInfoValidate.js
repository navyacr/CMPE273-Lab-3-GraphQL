const Model = require('../models/restaurants.model');
const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');
const { secret } = require('../../backend/config/mongo.config');
const { auth } = require("../../backend/config/passport");
auth();

function handle_request(msg, callback){
  Model.restaurantsModel.findOne({ email: msg.username}, (error, restaurant) => {
      if (error) {
          callback(error, {"status": "INVALID_CREDENTIALS"})
      }
      if (restaurant) {
        if (passwordHash.verify(msg.password, restaurant.password)){
          message = {"status": "SUCCESS"};
          const payload = { _id: restaurant._id, username: restaurant.name, type:"restaurant"};
          const token = jwt.sign(payload, secret, {
            expiresIn: 1008000
          });
          returnVal = Object.assign(message, {"token" : "JWT "+ token}, restaurant._doc)
          callback(null, returnVal)
        }
        else{
          callback(error, {"status": "INVALID_CREDENTIALS"})
        }
          
      }
      else{
        callback(error, {"status": "INVALID_CREDENTIALS"})
      }
  });
}

exports.handle_request = handle_request;