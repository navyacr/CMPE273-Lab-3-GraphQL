const { restaurants } = require("../models");
const db = require("../models");
const orders = db.orders;
const dishes = db.dishes;
const customers = db.customers;
const Op = db.Sequelize.Op;
var kafka = require('../kafka/client');

exports.create = (req, res) => { 
  req.body.customerId = req.params.customerId
    kafka.make_request('cusOrderCreate',req.body, function(err,results){
      if (err){
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else {
        res.json({
            updatedList:results
        });
        res.end();
      }
      
  });

  // var result = []
  
  // for(dish of req.body.dishes) {
  //   if (dish.qty < 1) {
  //     continue
  //   }
  //   // Create a Order
  //   var status = "Order Received"
  //   const o = {
  //     customerId: req.params.customerId,
  //     dishId: dish.id,
  //     qty: dish.qty,
  //     dm: req.body.dm,
  //     status: status
  //   };
  
  //   // Save Order in the database
  //   orders.create(o)
  //     .then(data => {
  //       result.push(data);
  //     })
  //     .catch(err => {
  //       // res.status(500).send({
  //       //   message:
  //       //     err.message || "Some error occurred while creating orders."
  //       // });
  //     });
  // }
  // res.send({"result": result})
};

exports.findAll = (req, res) => {
  req.body.customerId = req.params.customerId
    kafka.make_request('cusGetOrder',req.body, function(err,results){
      if (err){
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else {
        res.json({
            updatedList:results
        });
        res.end();
      }
      
  });


    // const customerId = req.params.customerId;
    // var condition = customerId ? { customerId: { [Op.eq]: `${customerId}` } } : null;
    // orders.findAll({
    //   where: condition,
    //   include: [{
    //       model: dishes,
    //       where: {},
    //       include: [{
    //         model: restaurants,
    //         where: {}
    //       }]
    //   }]
    // }).then(data => {
    //         res.send(data);
    //   })
    //   .catch(err => {
    //     res.status(500).send({
    //         message:
    //         err.message || "Some error occurred while retrieving orders."
    //     });
    //   })
  };

  exports.findRestaurantOrders = (req, res) => {
    req.body.restaurantId = req.params.restaurantId
    kafka.make_request('resGetOrder',req.body, function(err,results){
      if (err){
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else {
        res.json({
            updatedList:results
        });
        res.end();
      }
      
  });

    // const restaurantId = req.params.restaurantId;
    // var condition = restaurantId ? { restaurantId: { [Op.eq]: `${restaurantId}` } } : null;
    // orders.findAll({
    //   where: {},
    //   include: [{
    //       model: dishes,
    //       where: condition,
    //       include: [{
    //         model: restaurants,
    //         where: {}
    //       }]
    //   }, {
    //     model: customers
    //   }]
    // }).then(data => {
    //         res.send(data);
    //   })
    //   .catch(err => {
    //     res.status(500).send({
    //         message:
    //         err.message || "Some error occurred while retrieving orders."
    //     });
    //   })
    
  };

  exports.updateOrderStatus = (req, res) => {
    // req.body.name = req.params.restaurantId
    kafka.make_request('resOrderUpdate',req.body, function(err,results){

      if (err){
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
              res.json({
                  updatedList:results
              });
  
              res.end();
          }    
    });
    
    // const restaurantId = req.params.restaurantId;
    // const values = req.body.orders
    // for (o of values) {
    //   var condition = o.id ? { id: { [Op.eq]: `${o.id}` } } : null;
    //   const newProfile = {
    //     status: o.status
    //   };
    //   orders.update(newProfile, {
    //     where: condition
    //   })
    // }
    // res.send({"status": "OK"})
  };

  exports.cancelOrder = (req, res) => {

    req.body.orderId = req.params.orderId;
    req.body.status = "Cancelled";
    kafka.make_request('cusCancelOrder',req.body, function(err,results){
      if (err){
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else {
        res.json({
            updatedList:results
        });
        res.end();
      }
    });
    // const orderId = req.params.orderId;
    
    //   var condition = orderId ? { id: { [Op.eq]: `${orderId}` } } : null;
    //   const newProfile = {
    //     status: "Cancelled"
    //   };
    //   orders.update(newProfile, {
    //     where: condition
    //   })
    
    // res.send({"status": "OK"})
  };
