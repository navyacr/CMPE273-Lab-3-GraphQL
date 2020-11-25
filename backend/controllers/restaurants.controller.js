const db = require("../models");
const multer = require('multer');
const path = require('path');
const restaurants = db.restaurants;
const restaurantsProfile = db.restaurantsProfile;
const Op = db.Sequelize.Op;
const passwordHash = require('password-hash');
var kafka = require('../kafka/client');
const Model = require('../models/restaurants.model.mongo');
const dishesModel = require('../models/dishes.model.mongo');
const fs = require('fs');



exports.create = (req, res) => {

  kafka.make_request('resPostInfo',req.body, function(err,results){

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

exports.createReview = (req, res) => {
  req.body.customerId = req.params.customerId
  kafka.make_request('cusPostReview',req.body, function(err,results){

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

exports.aggReview = (req, res) => {
  req.body.restaurantId = req.params.restaurantId
  kafka.make_request('resAggReview',req.body, function(err,results){

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

  exports.findById = (req, res) => {
    req.body._id = req.params.restaurantId
    kafka.make_request('resGetInfo',req.body, function(err,results){

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

  exports.createOrUpdateDish = (req, res) => {
    req.body.name = req.params.dishName
    kafka.make_request('resCreateDisha',req.body, function(err,results){

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
  
  exports.postMessage = (req, res) => {
    kafka.make_request('postMessage',req.body, function(err,results){

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
  
  exports.getMessage = (req, res) => {
    kafka.make_request('getMessage',req.body, function(err,results){

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
  
  exports.findAll = (req, res) => {

    kafka.make_request('resGetAll',req.body, function(err,results){

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

  exports.validate = (req, res) => {

    kafka.make_request('resInfoValidate',req.body, function(err,results){
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

  exports.update = (req, res) => {
    req.body._id = req.params.restaurantId
    kafka.make_request('resUpdateInfo',req.body, function(err,results){

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

  exports.search = (req, res) => {

    kafka.make_request('resSearch',req.body, function(err,results){
      if (err){
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
        console.log("This is the result from search:", results)
              res.json({
                  updatedList:results
              });
              res.end();
      }    
    });
  };

  const resstorage = multer.diskStorage({
    destination: path.join(__dirname, '..') + '/public/uploads/restaurants',
    filename: (req, file, cb) => {
        cb(null, 'restaurant' + "-" + Date.now() + path.extname(file.originalname));
    }
  });
  const resuploads = multer({
    storage: resstorage
  }).single("resimage");

  exports.uploadImage = (req, res) => {
    
    resuploads(req, res, function (err) {
      if (!err) {
        const restaurantId = req.params.restaurantId;
        console.log('resId:', restaurantId)
        console.log("filename:", req.file)
        
        Model.restaurantsModel.findByIdAndUpdate(restaurantId, {filename: req.file.filename }, { safe: true, new: true, useFindAndModify: false }, function(error, restaurant){
          if (error) {
            res.send({"status": error})
          }
          if (restaurant) {
            console.log("Image updated")
            res.send({"status": restaurant})
          }
        });
      } else {
        res.status(404).send({"error": "err occurred"})
      }
    })
  };

exports.viewProfileImage = (req, res) =>{
  const restaurantId = req.params.restaurantId;
  
    Model.restaurantsModel.findOne({ _id: restaurantId })
      .then(data => {
        var image = path.join(__dirname, '..') + '/public/uploads/restaurants/' + data.filename;
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
};

const dishstorage = multer.diskStorage({
  destination: path.join(__dirname, '..') + '/public/uploads/dishes',
  filename: (req, file, cb) => {
      cb(null, 'dish' + "-" + Date.now() + path.extname(file.originalname));
  }
});

const dishuploads = multer({
  storage: dishstorage
}).single("image");

exports.dishUploadImage = (req, res) => {
  let payload = {};
  payload.id = req.params.dishId
  dishuploads(req, res, function (err) {

    payload.filename = req.file.filename
    kafka.make_request('dishImageUpload', payload, function(err,results){
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
  })
};
exports.viewDishImage = (req, res) =>{
  const dishId = req.params.dishId;
  
  dishesModel.findOne({ _id: dishId })
    .then(data => {
      var image = path.join(__dirname, '..') + '/public/uploads/dishes/' + data.filename;
      console.log("Image path", image)
      if (fs.existsSync(image)) {
          res.sendFile(image);
      }
      else {
          res.sendFile(path.join(__dirname, '..') + '/public/uploads/dishes/restaurant-1601843772667.jpg')
      }
    })
    .catch(err => {
      res.sendFile(path.join(__dirname, '..') + '/public/uploads/restaurants/restaurant-1601843772667.jpg')
      res.send("Error")
    });
};