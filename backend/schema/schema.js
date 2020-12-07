const graphql = require('graphql');
const Model = require('../models/restaurants.model.mongo');
const customersModel = require('../models/customers.model.mongo');
const dishesModel = require('../models/dishes.model.mongo');
const ordersModel = require('../models/orders.model.mongo');
const { customerSignup, restaurantSignup } = require('../mutations/signup');
const { cusLogin, resLogin } = require('../mutations/login');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
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
    description: { type: GraphQLString },
    category: { type: GraphQLString },
    price: { type: GraphQLString },
    restaurantId: { type: RestaurantType },
  }),
});

const DishInputType = new GraphQLInputObjectType({
  name: 'dishInput',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    ingredients: { type: GraphQLString },
    description: { type: GraphQLString },
    category: { type: GraphQLString },
    price: { type: GraphQLString },
    restaurantId: { type: GraphQLString },
  }),
});

const ItemType = new GraphQLInputObjectType({
  name: 'items',
  fields: () => ({
    dish: { type: DishInputType },
    qty: { type: GraphQLString },
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

const StatusType = new GraphQLObjectType({
  name: 'Status',
  fields: () => ({
    status: { type: GraphQLString },
    message: { type: GraphQLString },
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
    searchRestaurants: {
      type: new GraphQLList(RestaurantType),
      args: { keyword: { type: GraphQLString } },
      resolve(parent, args) {
        return Model.restaurantsModel.find({
          name: new RegExp(args.keyword, 'i'),
        });
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
    addCustomer: {
      type: StatusType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },

      resolve(parent, args) {
        return customerSignup(args);
      },
    },
    updateCustomer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        country: { type: GraphQLString },
        findmein: { type: GraphQLString },
        website: { type: GraphQLString },
        phonenumber: { type: GraphQLString },
        headline: { type: GraphQLString },
        nickname: { type: GraphQLString },
        dob: { type: GraphQLString },
      },
      resolve(parent, args) {
        return customersModel.findByIdAndUpdate(args.id, args);
      },
    },

    addRestaurant: {
      type: StatusType,
      args: {
        name: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        location: { type: GraphQLString },
      },
      resolve(parent, args) {
        return restaurantSignup(args);
      },
    },

    updateRestaurant: {
      type: RestaurantType,
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        location: { type: GraphQLString },
        description: { type: GraphQLString },
        contact: { type: GraphQLString },
        timings: { type: GraphQLString },
        cuisine: { type: GraphQLString },
        deliverymode: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Model.restaurantsModel.findByIdAndUpdate(args.id, args);
      },
    },
    customerLogin: {
      type: StatusType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        return cusLogin(args);
      },
    },
    restaurantLogin: {
      type: StatusType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        return resLogin(args);
      },
    },

    addMenu: {
      type: DishType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        ingredients: { type: GraphQLString },
        price: { type: GraphQLString },
        restaurantId: { type: GraphQLString },
        category: { type: GraphQLString },
      },
      resolve(parent, args) {
        const dish = new dishesModel({
          name: args.name,
          description: args.description,
          ingredients: args.ingredients,
          price: args.price,
          restaurantId: args.restaurantId,
          category: args.category,
        });
        return dish.save();
      },
    },
    updateOrder: {
      type: StatusType,
      args: {
        orderId: { type: GraphQLString },
        status: { type: GraphQLString },
      },
      async resolve(parent, args) {
        let err,
          updated_order = await ordersModel.findByIdAndUpdate(args.orderId, {
            status: args.status,
          });
        if (err) {
          return { status: 500, message: 'ERROR' };
        } else {
          return { status: 200, message: 'STATUS_UPDATED' };
        }
      },
    },
    placeOrder: {
      type: StatusType,
      args: {
        customerId: { type: GraphQLString },
        restaurantId: { type: GraphQLString },
        dishId: { type: GraphQLString },
        qty: { type: GraphQLString },
        dm: { type: GraphQLString },
      },
      async resolve(parent, args) {
        var dish = args.items;

        let neworder = new ordersModel({
          dishId: args.dishId,
          restaurantId: args.restaurantId,
          customerId: args.customerId,
          qty: args.qty,
          dm: args.dm,
          status: 'Order Received',
        });
        let saved = await neworder.save();
        console.log('Saved:', saved);
        if (saved) {
          return { status: 200, message: 'ORDER_PLACED' };
        } else {
          return { status: 500, message: 'ERROR' };
        }
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = schema;
