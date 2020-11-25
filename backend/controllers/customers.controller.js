const db = require("../models");
const customers = db.customers;
const Op = db.Sequelize.Op;
var kafka = require('../kafka/client');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const customersModel = require('../models/customers.model.mongo');

exports.create = (req, res) => {
    kafka.make_request('cusPostInfoa',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      if (err){
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else");
              res.json({
                  updatedList:results
              });
  
              res.end();
          }
      
  });
  };

  exports.findProfile = (req, res) => {
    req.body._id = req.params.customerId
    kafka.make_request('cusGetInfo',req.body, function(err,results){
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
  };

  exports.allcustomers = (req, res) => {
    kafka.make_request('allcus',req.body, function(err,results){
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
  };
  
  exports.validate = (req, res) => {
    
    kafka.make_request('cusInfoValidate',req.body, function(err,results){
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

  }

  exports.update = (req, res) => {
    req.body._id = req.params.customerId
    kafka.make_request('cusPostInfoUpdatea',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      if (err) {
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      } 
      else {
          console.log("Inside else");
          res.json({
              updatedList:results
          });
  
          res.end();
      }
    });
  };

  exports.getChatRestaurants = (req, res) => {
    req.body.customerId = req.params.customerId
    kafka.make_request('getChatRestaurants',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      if (err) {
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      } 
      else {
          console.log("Inside else");
          res.json({
              updatedList:results
          });
  
          res.end();
      }
    });
  };

  const cusstorage = multer.diskStorage({
    destination: path.join(__dirname, '..') + '/public/uploads/customers',
    filename: (req, file, cb) => {
        cb(null, 'customer' + "-" + Date.now() + path.extname(file.originalname));
    }
  });

  const cusuploads = multer({
    storage: cusstorage,
    limits: { fileSize: 1000000 },
  }).single("image");

  exports.uploadImage = (req, res) => {
    cusuploads(req, res, function (err) {
      if (!err) {
      const customerId = req.params.customerId;
      console.log('cusId:', customerId)
      console.log("filename:", req.file)
      
      customersModel.findByIdAndUpdate(customerId, {filename: req.file.filename }, { safe: true, new: true, useFindAndModify: false }, function(error, customer){
        if (error) {
          res.send({"status": error})
        }
        if (customer) {
          console.log("Image updated")
          res.send({"status": customer})
        }
      });
    } else {
      res.status(404).send({"error": "err occurred"})
    }
  })
    // cusuploads(req, res, function (err) {
    //     if (!err) {
    //       const customerId = req.params.customerId;
    //       var condition = customerId ? { customerId: { [Op.eq]: `${customerId}` } } : null;
    //       // Create a Tutorial
    //       const newProfile = {
    //         filename: req.file.filename
    //       };
    //       customersProfile.update(newProfile, {where: condition})
    //       .then(data => {
    //           res.send(data)
    //       })
    //       .catch(err => {
    //           res.status(500).send({
    //             message:
    //               err.message || "Some error occurred while updating the customersProfile."
    //           });
    //         });
    //     }   
    // })
};

exports.viewProfileImage = (req, res) =>{
  const customerId = req.params.customerId;
  
    customersModel.findOne({ _id: customerId })
      .then(data => {
        var image = path.join(__dirname, '..') + '/public/uploads/customers/' + data.filename;
        console.log("Image path", image)
        if (fs.existsSync(image)) {
            res.sendFile(image);
        }
        else {
            res.sendFile(path.join(__dirname, '..') + '/public/uploads/restaurants/restaurant-1601843772667.jpg')
        }
      })
      .catch(err => {
        res.sendFile(path.join(__dirname, '..') + '/public/uploads/restaurants/restaurant-1601843772667.jpg')
        res.send("Error")
      });
  // const customerId = req.params.customerId;
  //   var condition = customerId ? { customerId: { [Op.eq]: `${customerId}` } } : null;
  
  //   customersProfile.findOne({ where: condition })
  //     .then(data => {
  //       var image = path.join(__dirname, '..') + '/public/uploads/customers/' + data.filename;
  //       if (fs.existsSync(image)) {
  //           res.sendFile(image);
  //       }
  //       else {
  //           res.sendFile(path.join(__dirname, '..') + '/public/uploads/restaurants/restaurant-1601843772667.jpg')
  //       }
  //     })
  //     .catch(err => {
  //       res.sendFile(path.join(__dirname, '..') + '/public/uploads/restaurants/restaurant-1601843772667.jpg')
  //     });
};