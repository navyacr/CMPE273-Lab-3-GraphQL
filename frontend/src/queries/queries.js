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

export { getRestaurantAll, getCustomerOne };
