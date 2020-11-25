const graphql = require("graphql");
const Model = require("../models/restaurants.model.mongo");
const customersModel = require("../models/customers.model.mongo");
const dishesModel = require("../models/dishes.model.mongo");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const RestaurantType = new GraphQLObjectType({
  name: "restaurants",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    description: { type: GraphQLString },
    contact: { type: GraphQLString },
    timings: { type: GraphQLString },
    location: { type: GraphQLString },
    filename: { type: GraphQLString },
    cuisine: { type: GraphQLString },
    deliverymode: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

const CustomerType = new GraphQLObjectType({
  name: "customers",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    dob: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    country: { type: GraphQLString },
    nickname: { type: GraphQLString },
    yelpsince: { type: GraphQLString },
    thingsilove: { type: GraphQLString },
    findmein: { type: GraphQLString },
    website: { type: GraphQLString },
    phonenumber: { type: GraphQLString },
    filename: { type: GraphQLString },
    headline: { type: GraphQLString },
  }),
});

const DishType = new GraphQLObjectType({
  name: "dishes",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    ingredients: { type: GraphQLString },
    filename: { type: GraphQLString },
    description: { type: GraphQLString },
    category: { type: GraphQLString },
    price: { type: GraphQLString },
    restaurantId: { type: RestaurantType },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Root Query",
  fields: {
    getRestaurant: {
      type: RestaurantType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Model.restaurantsModel.findById(args.id);
      },
    },
    getRestaurants: {
      type: new GraphQLList(RestaurantType),
      args: {},
      resolve(parent, args) {
        return Model.restaurantsModel.find({});
      },
    },
    getCustomer: {
      type: CustomerType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return customersModel.findById(args.id);
      },
    },

    getMenu: {
      type: DishType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return dishesModel.findById(args.id);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  // mutation: Mutation
});

module.exports = schema;
