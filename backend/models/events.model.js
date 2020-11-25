module.exports = (sequelize, Sequelize) => {
    const events = sequelize.define("events", {
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      time: {
        type: Sequelize.TIME
      },
      location: {
        type: Sequelize.STRING
      },
      hashtags: {
        type: Sequelize.STRING
      }
    });
  
    return events;
  };