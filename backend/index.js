const { mongoDB, frontendURL } = require('./config/mongo.config');
const mongoose = require('mongoose');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 500,
    bufferMaxEntries: 0
};

mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});

const app = require('./app');

app.use("/graphql",graphqlHTTP({
    schema,
    graphiql: true
}));

// Router variables 
var restaurantsRouter = require("./routes/restaurants");
app.use("/restaurants", restaurantsRouter);

var customersRouter = require("./routes/customers");
app.use("/customers", customersRouter);

var eventsRouter = require("./routes/events");
app.use("/events", eventsRouter);



//start your server on port 3001
module.exports = app;
app.listen(3001);
console.log("Server Listening on port 3001");

const db = require("./models");
// TODO: Remove force: true and change to sync() in production
// force: true drops table and resyncs db 
// db.sequelize.sync({ force: false }).then(() => {
//     console.log("Drop and re-sync db.");
// });