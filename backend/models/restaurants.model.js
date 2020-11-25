module.exports = (sequelize, Sequelize) => {
    const restaurants = sequelize.define("restaurants", {
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      },
    //   location: {
    //     type: Sequelize.STRING
    //   }
    });
  
    return restaurants;
  };