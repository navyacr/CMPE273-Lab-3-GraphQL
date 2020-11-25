module.exports = (sequelize, Sequelize) => {
    const restaurantsProfile = sequelize.define("restaurantsProfile", {
      description: {
        type: Sequelize.STRING
      },
      contact: {
        type: Sequelize.STRING,
        unique: true
      },
      timings: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      }, 
      filename: {
        type: Sequelize.STRING
      },
      cuisine: {
        type: Sequelize.STRING
      },
      deliverymode: {
        type: Sequelize.STRING
      }
    });
  
    return restaurantsProfile;
  };