const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.restaurants = require("./restaurants.model.js")(sequelize, Sequelize);
db.customers = require("./customers.model.js")(sequelize, Sequelize);
db.dishes = require("./dishes.model.js")(sequelize, Sequelize);
db.orders = require("./orders.model.js")(sequelize, Sequelize);
db.reviews = require("./reviews.model.js")(sequelize, Sequelize);
db.events = require("./events.model.js")(sequelize, Sequelize);
db.eventAttendees = require("./eventAttendees.model.js")(sequelize, Sequelize);
db.restaurantsProfile = require("./restaurantsProfile.model")(sequelize, Sequelize);
db.customersProfile = require("./customersProfile.model")(sequelize, Sequelize);

// Adding foreign keys to the tables
db.dishes.belongsTo(db.restaurants);
db.orders.belongsTo(db.customers);
db.orders.belongsTo(db.dishes);
db.reviews.belongsTo(db.customers);
db.reviews.belongsTo(db.restaurants);
db.eventAttendees.belongsTo(db.events);
db.eventAttendees.belongsTo(db.customers);
db.restaurantsProfile.belongsTo(db.restaurants);
db.customersProfile.belongsTo(db.customers);

module.exports = db;