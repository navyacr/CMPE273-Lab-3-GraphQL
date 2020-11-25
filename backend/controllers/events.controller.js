const db = require("../models");
const events = db.events;
const Op = db.Sequelize.Op;
var kafka = require('../kafka/client');

exports.create = (req, res) => {
    kafka.make_request('eventsCreate',req.body, function(err,results){

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
    
    // if (!req.body.name) {
    //   res.status(400).send({
    //     message: "Content can not be empty!"
    //   });
    //   return;
    // }
  
    // const e = {
    //   name: req.body.name,
    //   description: req.body.description,
    //   time: req.body.time,
    //   date: req.body.date,
    //   location: req.body.location,
    //   hashtags: req.body.hashtags
    // };
  
    // // Save Tutorial in the database
    // events.create(e)
    //   .then(data => {
    //     res.send(data);
    //   })
    //   .catch(err => {
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred while creating the event."
    //     });
    //   });
  };

  exports.findAll = (req, res) => {
    kafka.make_request('eventsGet',req.body, function(err,results){  

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
    
    // events.findAll({
    //   order: [
    //     [ 'date', 'ASC' ]
    //   ]
    // })
    //   .then(data => {
    //     res.send(data);
    //   })
    //   .catch(err => {
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred while retrieving events."
    //     });
    //   });
  };

  exports.register = (req, res) => {
    req.body.eventId = req.params.eventId
    kafka.make_request('cusEventRegister',req.body, function(err,results){
  
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
  };

  exports.customerEvents = (req, res) => {

    req.body.customerId = req.params.customerId
    kafka.make_request('cusEventsEnrolled',req.body, function(err,results){
  
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
    // const customerId = req.params.customerId;
    // var condition1 = customerId ? { customerId: { [Op.eq]: `${customerId}` } } : null;
    // eventAttendees.findAll(
    //   {where: condition1,
    //     include: [{
    //         model: events,
    //         where: {}
    //     }]
    //   })
    //     .then(data => {
    //         res.send(data);
    //     })        
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //             err.message || "Some error occurred while retrieving dishes."
    //         });
    //     });
  }

  exports.search = (req, res) => {
    kafka.make_request('eventsSearch',req.body, function(err,results){
  
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
    // var value = req.body.value
    //   var condition =  { name : { [Op.like]: `%${value}%` } }
    //   events.findAll({
    //   where: condition,
      
    // }).then((data) => {
    //       res.send(data)
    //       console.log("*********************\n\n\n\n\n",data);
    // })
    // .catch(err => {
    //   res.status(500).send({
    //     message:
    //       err.message || "Some error occurred while updating the restaurantProfile."
    //   });
    // });
  }

    exports.findAttendees = (req, res) => {
      req.body.eventId = req.params.eventId
      kafka.make_request('resEventAttendees',req.body, function(err,results){
    
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


      // const eventId = req.params.eventId;
      // var condition1 = eventId ? { eventId: { [Op.eq]: `${eventId}` } } : null;
      // eventAttendees.findAll(
      //   {where: condition1,
      //     include: [{
      //         model: customers,
      //         where: {}
      //     }]
      //   })
      //     .then(data => {
      //         res.send(data);
      //     })        
      //     .catch(err => {
      //         res.status(500).send({
      //             message:
      //             err.message || "Some error occurred while retrieving dishes."
      //         });
      //     });
  }