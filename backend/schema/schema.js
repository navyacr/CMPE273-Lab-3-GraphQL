const graphql = require("graphql");
const Model = require("../models/restaurants.model.mongo");

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
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  // mutation: Mutation
});

module.exports = schema;
