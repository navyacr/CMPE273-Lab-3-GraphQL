module.exports = (sequelize, Sequelize) => {
    const customersProfile = sequelize.define("customersProfile", {
      dob: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      nickname: {
        type: Sequelize.STRING
      },
      yelpsince: {
        type: Sequelize.STRING
      }, 
      thingsilove: {
        type: Sequelize.STRING
      }, 
      findmein: {
        type: Sequelize.STRING
      }, 
      website: {
        type: Sequelize.STRING
      }, 
      phonenumber: {
        type: Sequelize.STRING
      },  
      headline: {
        type: Sequelize.STRING
      },
      filename: {
        type: Sequelize.STRING
      },
    });
  
    return customersProfile;
  };