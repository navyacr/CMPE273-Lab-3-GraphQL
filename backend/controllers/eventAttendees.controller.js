const db = require("../models");
const eventAttendees = db.eventAttendees;
const customers = db.customers;
const events = db.events;
const Op = db.Sequelize.Op;

// Create and Save a new eventAttendee
// exports.create = (req, res) => {
//   req.body._id = req.params.eventId
//   req.body.customerId = req.params.customerId
//   kafka.make_request('cusEventRegister',req.body, function(err,results){

//     if (err){
//         res.json({
//             status:"error",
//             msg:"System Error, Try Again."
//         })
//     }else{
//             res.json({
//                 updatedList:results
//             });

//             res.end();
//         }    
//   });
// };
   
    // Create a eventAttendees
    // const eA = {
    //   eventId: req.params.eventId,
    //   customerId: req.body.customerId
    // };
  
    // eventAttendees.create(eA)
    //   .then(data => {
    //     res.send(data);
    //   })
    //   .catch(err => {
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred while creating the eventAttendees."
    //     });
    //   });
// };

exports.findAll = (req, res) => {
    const eventId = req.params.eventId;
    var condition1 = eventId ? { eventId: { [Op.eq]: `${eventId}` } } : null;
    eventAttendees.findAll(
      {where: condition1,
        include: [{
            model: customers,
            where: {}
        }]
      })
        .then(data => {
            res.send(data);
        })        
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving dishes."
            });
        });
}

// exports.customerEvents = (req, res) => {
//   const customerId = req.params.customerId;
//   var condition1 = customerId ? { customerId: { [Op.eq]: `${customerId}` } } : null;
//   eventAttendees.findAll(
//     {where: condition1,
//       include: [{
//           model: events,
//           where: {}
//       }]
//     })
//       .then(data => {
//           res.send(data);
//       })        
//       .catch(err => {
//           res.status(500).send({
//               message:
//               err.message || "Some error occurred while retrieving dishes."
//           });
//       });
// }
