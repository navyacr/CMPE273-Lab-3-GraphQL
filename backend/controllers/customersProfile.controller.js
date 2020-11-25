const db = require("../models");
const multer = require('multer');
const path = require('path');
const customersProfile = db.customersProfile;
const Op = db.Sequelize.Op;
const fs = require('fs');


// Create and Save a new profile table
exports.createOrUpdate = (req, res) => {
        // First try to find the record
        const customerId = req.params.customerId;
        var condition = customerId ? { customerId: { [Op.eq]: `${customerId}` } } : null;
        // Create a profile table
        const newProfile = {
          dob: req.body.dob,
          city: req.body.city,
          state: req.body.state,
          country: req.body.country,
          nickname: req.body.nickname,
          headline: req.body.headline,
          yelpsince: req.body.yelpsince,
          thingsilove: req.body.thingsilove,
          findmein: req.body.findmein,
          website: req.body.website,
          phonenumber: req.body.phonenumber,
          customerId: customerId
        };

        customersProfile.findOne({where: condition})
        .then(function (foundItem) {
            if (!foundItem) {
                // Item not found, create a new one
                customersProfile.create(newProfile)
                    .then(data => {
                        res.send(data)
                    })
                    .catch(err => {
                        res.status(500).send({
                          message:
                            err.message || "Some error occurred while creating the customerProfile."
                        });
                      });
            }
             // Found an item, update it
            customersProfile.update(newProfile, {where: condition})
                .then(data => {
                    res.send(data)
                })
                .catch(err => {
                    res.status(500).send({
                      message:
                        err.message || "Some error occurred while updating the customerProfile."
                    });
                  });
        });
  };

  exports.findOne = (req, res) => {
    // const customerId = req.params.customerId;
    // var condition = customerId ? { customerId: { [Op.eq]: `${customerId}` } } : null;
  
    // customersProfile.findOne({ where: condition })
    //   .then(data => {
    //     res.send(data);
    //   })
    //   .catch(err => {
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred while retrieving customers."
    //     });
    //   });
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
          var condition = customerId ? { customerId: { [Op.eq]: `${customerId}` } } : null;
          // Create a Tutorial
          const newProfile = {
            filename: req.file.filename
          };
          customersProfile.update(newProfile, {where: condition})
          .then(data => {
              res.send(data)
          })
          .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while updating the customersProfile."
              });
            });
        }   
    })
};

exports.viewProfileImage = (req, res) =>{
  const customerId = req.params.customerId;
    var condition = customerId ? { customerId: { [Op.eq]: `${customerId}` } } : null;
  
    customersProfile.findOne({ where: condition })
      .then(data => {
        var image = path.join(__dirname, '..') + '/public/uploads/customers/' + data.filename;
        if (fs.existsSync(image)) {
            res.sendFile(image);
        }
        else {
            res.sendFile(path.join(__dirname, '..') + '/public/uploads/restaurants/restaurant-1601843772667.jpg')
        }
      })
      .catch(err => {
        res.sendFile(path.join(__dirname, '..') + '/public/uploads/restaurants/restaurant-1601843772667.jpg')
      });
};