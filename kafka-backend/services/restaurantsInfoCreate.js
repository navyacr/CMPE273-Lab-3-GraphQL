const Model = require('../models/restaurants.model');
const passwordHash = require('password-hash');

function handle_request(msg, callback) {
  let hashedPassword = passwordHash.generate(msg.password);
  let newrestaurant = new Model.restaurantsModel({
    name: msg.name,
    email: msg.email,
    password: hashedPassword,
    location: msg.location,
  });
  console.log('New restaurant is', newrestaurant);

  if (!newrestaurant) {
    callback(null, { message: 'Not Done' });
  }
  if (!callback) {
    return newrestaurant;
  }

  Model.restaurantsModel.findOne({ email: msg.email }, (error, restaurant) => {
    if (error) {
      callback(error, { status: 'error' });
    }
    if (restaurant) {
      console.log('Restaurant already exists');
      callback({ status: 'error' }, { status: 'error' });
    } else {
      newrestaurant.save(function (error, data) {
        if (error) {
          console.log('Erroris:', error);
          callback({ status: 'error' }, { status: 'error' });
        } else {
          callback(null, { status: 'SUCCESS', data });
        }
      });
    }
  });
}

exports.handle_request = handle_request;
