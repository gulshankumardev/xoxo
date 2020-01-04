import gql from 'graphql-tag';

const typeDefs = gql`
  extend type User {
    userId: String
    isLoggedIn: Boolean!
  }
`;

export default typeDefs;
