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
  mutation cuslogin($email: String, $password: String) {
    customerLogin(email: $email, password: $password) {
      message
      status
    }
  }
`;

export { addCustomerMutation, customerLoginMutation };
