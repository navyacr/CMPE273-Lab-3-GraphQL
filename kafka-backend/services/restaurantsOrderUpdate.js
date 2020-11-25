const ordersModel = require('../models/orders.model');

function handle_request(msg, callback){
    orders = msg.orders
    for (var i in orders){
        ordersModel.findByIdAndUpdate(orders[i]._id, {status: orders[i].status}, { safe: true, new: true, useFindAndModify: false }, function(error, output) {
        })

    }
    callback(null, {"status": "SUCCESS"})
    
}

exports.handle_request = handle_request;
