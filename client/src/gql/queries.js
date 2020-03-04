import gql from 'graphql-tag';

export const USER_INFO_QUERY = gql`
  query userInfo {
    me @client {
      userId
      isLoggedIn
    }
  }
`;

export const ALL_POSTS_QUERY = gql`
  query allPostsQuery {
    posts {
      id
      title
      description
      createdAt
      updatedAt
      author {
        id
        name
      }
      likedBy {
        id
      }
    }
  }
`;

export const USER_PROFILE_QUERY = gql`
  query userProfileQuery {
    me {
      name
      email
      createdAt
      updatedAt
      posts {
        id
      }
      likedPosts {
        id
      }
    }
  }
`;
