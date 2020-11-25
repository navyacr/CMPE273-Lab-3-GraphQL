const db = require("../models");
const multer = require('multer');
const path = require('path');
const restaurantsProfile = db.restaurantsProfile;
const restaurants = db.restaurants;
const Op = db.Sequelize.Op;
const fs = require('fs');
const dishes = db.dishes;

  exports.findOne = (req, res) => {
    const restaurantId = req.params.restaurantId;
    var condition = restaurantId ? { restaurantId: { [Op.eq]: `${restaurantId}` } } : null;
  
    restaurantsProfile.findOne({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving restaurants."
        });
      });
  };

  const resstorage = multer.diskStorage({
    destination: path.join(__dirname, '..') + '/public/uploads/restaurants',
    filename: (req, file, cb) => {
        cb(null, 'restaurant' + "-" + Date.now() + path.extname(file.originalname));
    }
  });

  exports.search = (req, res) => {
    var type = req.body.type
    var value = req.body.value
    if (type === 'dishname'){
      var condition =  { name : { [Op.like]: `%${value}%` } }
      dishes.findAll({
      where: condition,
      include: [{
          model: restaurants,
          where: {}
      }]
    }).then((data) => {
          res.send(data)
          console.log("*********************\n\n\n\n\n",data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating the restaurantProfile."
      });
    });
    }

    if (type === 'restaurantname'){
      var condition =  { name : { [Op.like]: `%${value}%` } }
      restaurantsProfile.findAll({
      // where: condition,
      include: [{
          model: restaurants,
          where: condition
      }]
    }).then((data) => {
          res.send(data)
          console.log("*********************\n\n\n\n\n",data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while searching the restaurantProfile."
      });
    });
    }

    if (type === 'location'){
      var condition =  { location : { [Op.like]: `%${value}%` } }
      restaurantsProfile.findAll({
      where: condition,
      include: [{
          model: restaurants,
          where: {}
      }]
    }).then((data) => {
          res.send(data)
          console.log("*********************\n\n\n\n\n",data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating the restaurantProfile."
      });
    });
    }

    var condition =  { [type] : { [Op.eq]: `${value}` } }
    restaurantsProfile.findAll({
      where: condition,
      include: [{
          model: restaurants,
          where: {}
      }]
    }).then((data) => {
          res.send(data)
          console.log("*********************\n\n\n\n\n",data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating the restaurantProfile."
      });
    });
  };
  
  const resuploads = multer({
    storage: resstorage,
    // limits: { fileSize: 1000000 },
  }).single("resimage");

  exports.uploadImage = (req, res) => {
    
    resuploads(req, res, function (err) {
        if (!err) {
          // res.status(200).send()
          const restaurantId = req.params.restaurantId;
          var condition = restaurantId ? { restaurantId: { [Op.eq]: `${restaurantId}` } } : null;
          
          const newProfile = {
            filename: req.file.filename
          };
          restaurantsProfile.update(newProfile, {where: condition})
          .then(data => {
              res.send(data)
          })
          .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while updating the restaurantProfile."
              });
            });
        } else {
          res.status(404).send(err)
        }
    })
};

exports.viewProfileImage = (req, res) =>{
  const restaurantId = req.params.restaurantId;
    var condition = restaurantId ? { restaurantId: { [Op.eq]: `${restaurantId}` } } : null;
  
    restaurantsProfile.findOne({ where: condition })
      .then(data => {
        var image = path.join(__dirname, '..') + '/public/uploads/restaurants/' + data.filename;
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