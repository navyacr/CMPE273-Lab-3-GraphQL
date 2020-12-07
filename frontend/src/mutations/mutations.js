import { gql } from 'apollo-boost';

const addCustomerMutation = gql`
  mutation AddCustomer($name: String, $email: String, $password: String) {
    addCustomer(name: $name, email: $email, password: $password) {
      message
      status
    }
  }
`;

const customerLoginMutation = gql`
  mutation cusLogin($email: String, $password: String) {
    customerLogin(email: $email, password: $password) {
      message
      status
    }
  }
`;

const addRestaurantMutation = gql`
  mutation AddRestaurant(
    $name: String
    $email: String
    $password: String
    $location: String
  ) {
    addRestaurant(
      name: $name
      email: $email
      password: $password
      location: $location
    ) {
      message
      status
    }
  }
`;
const restaurantLoginMutation = gql`
  mutation resLogin($email: String, $password: String) {
    restaurantLogin(email: $email, password: $password) {
      message
      status
    }
  }
`;

const addMenuMutation = gql`
  mutation addMenu(
    $name: String
    $description: String
    $ingredients: String
    $price: String
    $category: String
    $restaurantId: String
  ) {
    addMenu(
      name: $name
      description: $description
      ingredients: $ingredients
      price: $price
      category: $category
      restaurantId: $restaurantId
    ) {
      id
      name
    }
  }
`;
const updateRestaurantMutation = gql`
  mutation UpdateRestaurant(
    $name: String
    $id: String
    $email: String
    $location: String
    $description: String
    $contact: String
    $timings: String
    $cuisine: String
    $deliverymode: String
  ) {
    updateRestaurant(
      name: $name
      id: $id
      email: $email
      location: $location
      description: $description
      contact: $contact
      deliverymode: $deliverymode
      timings: $timings
      cuisine: $cuisine
    ) {
      id
      name
    }
  }
`;

const updateCustomerMutation = gql`
  mutation updateCustomer(
    $name: String
    $id: String
    $email: String
    $city: String
    $state: String
    $country: String
    $findmein: String
    $website: String
    $phonenumber: String
    $headline: String
    $nickname: String
    $dob: String
  ) {
    updateCustomer(
      name: $name
      id: $id
      email: $email
      city: $city
      state: $state
      country: $country
      findmein: $findmein
      website: $website
      phonenumber: $phonenumber
      headline: $headline
      dob: $dob
      nickname: $nickname
    ) {
      id
      name
    }
  }
`;
const placeOrderMutation = gql`
  mutation PlaceOrder(
    $customerId: String
    $dm: String
    $restaurantId: String
    $dishId: String
    $qty: String
  ) {
    placeOrder(
      customerId: $customerId
      dm: $dm
      restaurantId: $restaurantId
      dishId: $dishId
      qty: $qty
    ) {
      status
      message
    }
  }
`;
export {
  addCustomerMutation,
  customerLoginMutation,
  addRestaurantMutation,
  restaurantLoginMutation,
  addMenuMutation,
  updateRestaurantMutation,
  updateCustomerMutation,
  placeOrderMutation,
};
