module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "Mysore123",
    DB: "yelp",
    dialect: "mysql",
    pool: {
      max: 100,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };