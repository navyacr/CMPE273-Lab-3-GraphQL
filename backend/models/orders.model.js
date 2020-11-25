module.exports = (sequelize, Sequelize) => {

    const orders = sequelize.define("orders", {
      qty: {
        type: Sequelize.INTEGER
      },
      dm: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      }
    });   

    return orders;
  };

  