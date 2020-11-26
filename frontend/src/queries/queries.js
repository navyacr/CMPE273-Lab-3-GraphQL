import { gql } from "apollo-boost";

const getRestaurantAll = gql`
  {
    getRestaurants {
      name
      cuisine
      deliverymode
      timings
      description
    }
  }
`;

const getRestaurantOne = gql`
  query($restaurant_id: String) {
    getRestaurant(id: $restaurant_id) {
      id
      name
      cuisine
      deliverymode
      timings
      description
      email
      contact
      location
    }
  }
`;

const getRestaurantMenu = gql`
  query($restaurant_id: String) {
    getMenu(id: $restaurant_id) {
      id
      name
      category
      ingredients
      description
      price
    }
  }
`;

const getCustomerOne = gql`
  query($customer_id: String) {
    getCustomer(id: $customer_id) {
      name
      email
      dob
      city
      state
      country
      nickname
      yelpsince
      thingsilove
      findmein
      website
      phonenumber
      filename
      headline
    }
  }
`;
const getOrdersCustomer = gql`
  query($customer_id: String) {
    getOrders(id: $customer_id) {
      dm
      qty
      status
      date
      dishId {
        id
        name
        price
      }
      customerId {
        id
        email
      }
      restaurantId {
        name
      }
    }
  }
`;
export {
  getRestaurantAll,
  getCustomerOne,
  getOrdersCustomer,
  getRestaurantOne,
  getRestaurantMenu,
};
