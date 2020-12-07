const ordersModel = require('../models/orders.model');

function handle_request(msg, callback) {
  console.log(msg);
  var dish = msg.dishes;
  for (var i in dish) {
    console.log('Each dish qty is:', dish[i].qty);
    if (dish[i].qty !== 0) {
      let neworder = new ordersModel({
        dishId: dish[i]._id,
        restaurantId: dish[i].restaurantId,
        customerId: msg.customerId,
        qty: dish[i].qty,
        dm: msg.dm,
        status: 'Order Received',
      });
      neworder.save();
      preventDefault();
    }
  }
  callback(null, { status: 'SUCCESS' });
}

exports.handle_request = handle_request;
