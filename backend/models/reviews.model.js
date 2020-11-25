module.exports = (sequelize, Sequelize) => {
    const reviews = sequelize.define("reviews", {
      rating: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
    });
  
    return reviews;
  };