const Model = require('../models/restaurants.model.mongo');
const customersModel = require('../models/customers.model.mongo');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/mongo.config');

cusLogin = async (args) => {
  //   return { status: 200, message: 'SUCCESS' };
  let err,
    customer = await customersModel.findOne({ email: args.email });
  console.log('Customer: ', customer);
  console.log('Error: ', err);

  if (!customer) {
    return { status: 401, message: 'NO_USER' };
  }

  if (passwordHash.verify(args.password, customer.password)) {
    const payload = {
      id: customer._id,
      name: customer.name,
      email: customer.email,
    };
    var token = jwt.sign(payload, secret, {
      expiresIn: 1008000,
    });
    token = 'JWT ' + token;
    return { status: 200, message: token };
  } else {
    return { status: 401, message: 'INCORRECT_PASSWORD' };
  }
};

const resLogin = async (args) => {
  let err,
    user = await Model.restaurantsModel.findOne({ email: args.email });
  if (user.length === 0) {
    return { status: 401, message: 'NO_USER' };
  }
  if (passwordHash.verify(args.password, user.password)) {
    const payload = { id: user._id, name: user.name, email: user.email };
    var token = jwt.sign(payload, secret, {
      expiresIn: 1008000,
    });
    token = 'JWT ' + token;
    return { status: 200, message: token };
  } else {
    return { status: 401, message: 'INCORRECT_PASSWORD' };
  }
};

exports.cusLogin = cusLogin;
exports.resLogin = resLogin;
