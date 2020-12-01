const Model = require('../models/restaurants.model.mongo');
const customersModel = require('../models/customers.model.mongo');
const passwordHash = require('password-hash');

const customerSignup = async (args) => {
  let hashedPassword = passwordHash.generate(args.password);
  let newcus = new customersModel({
    name: args.name,
    email: args.email,
    password: hashedPassword,
    school: args.school,
  });
  let err,
    customer = await customersModel.find({ email: args.email });
  if (customer.length) {
    return { status: 400, message: 'CUSTOMER_EXISTS' };
  }
  let savedcus = await newcus.save();
  if (savedcus) {
    return { status: 200, message: 'CUSTOMER_ADDED' };
  } else {
    return { status: 500, message: 'INTERNAL_SERVER_ERROR' };
  }
};

const restaurantSignup = async (args) => {
  let hashedPassword = passwordHash.generate(args.password);
  let newres = new Model.restaurantsModel({
    name: args.name,
    email: args.email,
    password: hashedPassword,
    location: args.location,
  });

  let err,
    restaurant = await Model.restaurantsModel.find({ email: args.email });
  if (restaurant.length) {
    return { status: 400, message: 'RESTAURANT_EXISTS' };
  }
  let savedres = await newres.save();
  if (savedres) {
    return { status: 200, message: 'RESTAURANT_ADDED' };
  } else {
    return { status: 500, message: 'INTERNAL_SERVER_ERROR' };
  }
};

exports.customerSignup = customerSignup;
exports.restaurantSignup = restaurantSignup;
