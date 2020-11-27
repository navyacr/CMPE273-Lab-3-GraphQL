const graphql = require('graphql');
const Model = require('../models/restaurants.model.mongo');
const customersModel = require('../models/customers.model.mongo');
const dishesModel = require('../models/dishes.model.mongo');
const ordersModel = require('../models/orders.model.mongo');
// const { GraphQLDateTime } = require('graphql-iso-date')

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
  name: 'restaurants',
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
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve(parent, args) {
        return parent.reviews;
      },
    },
  }),
});
const ReviewType = new GraphQLObjectType({
  name: 'reviews',
  fields: () => ({
    id: { type: GraphQLID },
    rating: { type: GraphQLInt },
    date: { type: GraphQLString },
    description: { type: GraphQLString },
    customerId: { type: CustomerType },
    customerName: { type: GraphQLString },
  }),
});

const CustomerType = new GraphQLObjectType({
  name: 'customers',
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
  name: 'dishes',
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

const OrderType = new GraphQLObjectType({
  name: 'orders',
  fields: () => ({
    id: { type: GraphQLID },
    customerId: { type: CustomerType },
    restaurantId: { type: RestaurantType },
    dishId: { type: DishType },
    qty: { type: GraphQLString },
    dm: { type: GraphQLString },
    status: { type: GraphQLString },
    date: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Root Query',
  fields: {
    getRestaurant: {
      type: RestaurantType,
      args: { id: { type: GraphQLString } },
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
      type: new GraphQLList(DishType),
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return dishesModel.find({ restaurantId: args.id });
      },
    },
    getOrders: {
      type: new GraphQLList(OrderType),
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return ordersModel
          .find({ customerId: args.id })
          .populate('customerId')
          .populate('restaurantId')
          .populate('dishId');
      },
    },

    getRestaurantOrders: {
      type: new GraphQLList(OrderType),
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return ordersModel
          .find({ restaurantId: args.id })
          .populate('customerId')
          .populate('restaurantId')
          .populate('dishId');
      },
    },
  },
});
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    updateCustomerProfile: {
      type: CustomerType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        let author = {
          name: args.name,
          age: args.age,
          id: args.id,
        };
        authors.push(author);
        console.log('Authors', authors);
        return author;
      },
    },

    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        let book = {
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
          id: books.length + 1,
        };
        books.push(book);
        return book;
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  // mutation: Mutation
});

module.exports = schema;
