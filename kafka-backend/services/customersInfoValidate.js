const customersModel = require('../models/customers.model');
const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');
const { secret } = require('../../backend/config/mongo.config');
const { auth } = require("../../backend/config/passport");
auth();

function handle_request(msg, callback){
  customersModel.findOne({ email: msg.username}, (error, customer) => {
      if (error) {
          callback(error, {"status": "INVALID_CREDENTIALS"})
      }
      if (customer) {
        // if (customer.password === msg.password){
        if (passwordHash.verify(msg.password, customer.password)){
          message = {"status": "SUCCESS"}
          const payload = { _id: customer._id, username: customer.name, type:"customer"};
          const token = jwt.sign(payload, secret, {
            expiresIn: 1008000
          });
          returnVal = Object.assign(message,{"token" : "JWT "+ token}, customer._doc)
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