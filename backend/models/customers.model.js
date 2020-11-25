module.exports = (sequelize, Sequelize) => {
    const customers = sequelize.define("customers", {
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      }
    });
  
    return customers;
  };