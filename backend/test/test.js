var app = require('../index');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;
var agent = require('chai').request.agent(app);

// Testing randomly chosed 5 APIs for response

it('Legit customer login',() => {
    agent.post("/customers/validate")
        .send({ username: "abc@gmail.com", password: "abc" })
        .then(function (res) {
            expect(res.status).to.equal(200);
        })
        .catch(error => {
            console.log(error);
        });
});

it('Invalid restaurant login', () => {
    agent.post("/restaurants/validate")
        .send({ username: "random@gmail.com", password: "password" })
        .then(function (res) {
            expect(res.message).to.equal("INVALID_CREDENTIALS");
        })
        .catch(error => {
            console.log(error);
        });
});

it('Get customer info', () => {
    agent.get("/customers/1/info")
        .then(function (res) {
            expect(res.status).to.equal(200);
        })
        .catch(error => {
            console.log(error);
        });
});

it('Event registration', () => {
    agent.post("/events/1/attendees")
        .send({"customerId": 1})
        .then(function (res) {
            expect(res.status).to.equal(200);
        })
        .catch(error => {
            console.log(error);
        });
});

it('Get menu of a restaurant', () => {
    agent.get("/restaurants/1/dishes")
        .then(function (res) {
            expect(res.status).to.equal(200);
        })
        .catch(error => {
            console.log(error);
        });
});