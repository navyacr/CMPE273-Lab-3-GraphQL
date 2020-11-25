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

export { getRestaurantAll };
