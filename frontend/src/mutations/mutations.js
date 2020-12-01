import { gql } from 'apollo-boost';

const addCustomerMutation = gql`
  mutation AddCustomer($name: String, $email: String, $password: String) {
    addStudent(name: $name, email: $email, password: $password) {
      message
      status
    }
  }
`;

export { addCustomerMutation };
