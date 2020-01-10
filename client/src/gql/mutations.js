import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
  mutation loginMutation($email: String!, $password: String!) {
    login @client
    login(email: $email, password: $password) {
      user {
        id
        name
        email
      }
      token
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation signupMutation($name: String!, $email: String!, $password: String!) {
    signup @client
    signup(name: $name, email: $email, password: $password) {
      user {
        id
        name
        email
      }
      token
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation logoutMutation {
    logout @client
  }
`;
