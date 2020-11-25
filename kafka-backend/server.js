var connection =  new require('./kafka/Connection');

var RestaurantsInfoCreate = require('./services/restaurantsInfoCreate.js');
var Customers = require("./services/customers.js")
var CustomersInfoUpdate = require("./services/customersInfoUpdate.js")
var CustomersGetInfo = require("./services/customersGetInfo.js")
var RestaurantsInfoUpdate = require("./services/restaurantsInfoUpdate.js")
var RestaurantsGetInfo = require("./services/restaurantsGetInfo.js")
var RestaurantsCreateDish = require("./services/restaurantsCreateUpdateDish.js")
var CustomersPostReview = require("./services/customersPostReview.js")
var CustomersOrderCreate = require("./services/customersOrderCreate.js")
var CustomersGetOrder = require("./services/customersGetOrder.js")
var RestaurantsGetOrder = require("./services/restaurantsGetOrder.js")
var RestaurantsOrderUpdate = require("./services/restaurantsOrderUpdate.js")
var CustomersOrderCancel = require("./services/customersOrderCancel")
var EventsCreateUpdate = require("./services/eventsCreateUpdate")
var EventsGetAll = require("./services/eventsGetAll")
var RestaurantsGetMenu = require("./services/restaurantsGetMenu")
var CustomerEventRegister = require("./services/customersEventRegister")
var CustomersEventsEnrolled = require("./services/customersEventsEnrolled")
var CustomersInfoValidate = require("./services/customersInfoValidate")
var RestaurantsGetAll = require("./services/restaurantsGetAll")
var RestaurantsAggReview = require("./services/restaurantsAggReview")
var RestaurantsInfoValidate = require("./services/restaurantsInfoValidate")
var RestaurantsGetEventAttendees = require("./services/restaurantsGetEventAttendees")
var RestaurantsSerach = require("./services/restaurantsSearch")
var EventsSearch = require("./services/eventsSearch")
var AllCustomers = require("./services/allCustomers")
var GetMessage = require("./services/getMessage")
var PostMessage = require("./services/postMessage")
var DishImageUpload = require("./services/dishImageUpload")
var GetChatRestaurants = require("./services/getChatRestaurants")

const mongoose = require('mongoose');

const { mongoDB, frontendURL } = require('../backend/config/mongo.config');

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

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log("Message is:", message.value)
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}

handleTopicRequest("resPostInfo",RestaurantsInfoCreate)
handleTopicRequest("cusPostInfoa", Customers)
handleTopicRequest("cusPostInfoUpdatea", CustomersInfoUpdate)
handleTopicRequest("cusGetInfo", CustomersGetInfo)
handleTopicRequest("resUpdateInfo", RestaurantsInfoUpdate)
handleTopicRequest("resGetInfo", RestaurantsGetInfo)
handleTopicRequest("resCreateDisha", RestaurantsCreateDish)
handleTopicRequest("cusPostReview", CustomersPostReview)
handleTopicRequest("cusOrderCreate", CustomersOrderCreate)
handleTopicRequest("cusGetOrder", CustomersGetOrder)
handleTopicRequest("resGetOrder", RestaurantsGetOrder)
handleTopicRequest("resOrderUpdate", RestaurantsOrderUpdate)
handleTopicRequest("cusCancelOrder", CustomersOrderCancel)
handleTopicRequest("eventsCreate", EventsCreateUpdate)
handleTopicRequest("eventsGet", EventsGetAll)
handleTopicRequest("resGetMenu", RestaurantsGetMenu)
handleTopicRequest("cusEventRegister", CustomerEventRegister)
handleTopicRequest("cusEventsEnrolled", CustomersEventsEnrolled)
handleTopicRequest("cusInfoValidate", CustomersInfoValidate)
handleTopicRequest("resGetAll", RestaurantsGetAll)
handleTopicRequest("resAggReview", RestaurantsAggReview)
handleTopicRequest("resInfoValidate", RestaurantsInfoValidate)
handleTopicRequest("resEventAttendees", RestaurantsGetEventAttendees)
handleTopicRequest("resSearch", RestaurantsSerach)
handleTopicRequest("eventsSearch", EventsSearch)
handleTopicRequest("allcus", AllCustomers)
handleTopicRequest("getMessage", GetMessage)
handleTopicRequest("postMessage", PostMessage)
handleTopicRequest("dishImageUpload", DishImageUpload)
handleTopicRequest("getChatRestaurants", GetChatRestaurants)







