import gql from 'graphql-tag';

const USER_INFO_QUERY = gql`
  query userInfo {
    me @client {
      userId
      isLoggedIn
    }
  }
`;

export default USER_INFO_QUERY;
