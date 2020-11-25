const express = require("express");
const customersProfile = require("../controllers/customersProfile.controller.js");
const restaurantsProfile = require("../controllers/restaurantsProfile.controller.js");
const app = express.Router();

const customers = require("../controllers/customers.controller.js");
const orders = require("../controllers/orders.controller.js");
const reviews = require("../controllers/reviews.controller.js");
const restaurants = require("../controllers/restaurants.controller.js");

//Route to handle Post Request Call
app.post('/info', customers.create)
app.post('/:customerId/infoUpdate', customers.update)
app.get('/:customerId/profile', customers.findProfile)
app.get('/allCustomers', customers.allcustomers)

app.post('/validate', customers.validate)

//Route to get orders of a customer
app.get('/:customerId/orders', orders.findAll)
app.post('/:customerId/orders', orders.create)
app.get('/:orderId/cancelOrder', orders.cancelOrder)

// Customer review for a restaurant
app.post('/:customerId/reviews', restaurants.createReview)
app.get('/:restaurantId/reviews', reviews.findAll)
app.get('/:restaurantId/aggreviews', restaurants.aggReview)
// app.post('/:customerId/profile', customersProfile.createOrUpdate)
app.post('/restaurantsearch', restaurants.search)
app.post('/:customerId/uploadImage', customers.uploadImage)
app.get('/:customerId/viewProfileImage', customers.viewProfileImage)

app.get('/:customerId/getChatRestaurants', customers.getChatRestaurants)

module.exports = app;
