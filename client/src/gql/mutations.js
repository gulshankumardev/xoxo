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

export const CREATE_POST_MUTATION = gql`
  mutation createPostMutation($title: String!, $description: String!) {
    createPost(title: $title, description: $description) {
      id
      title
      description
      createdAt
      updatedAt
      author {
        id
        name
      }
    }
  }
`;

export const DELETE_POST_MUTATION = gql`
  mutation deletePostMutation($postId: String!) {
    deletePost(postId: $postId) {
      id
    }
  }
`;

export const UPDATE_POST_MUTATION = gql`
  mutation updatePostMutation(
    $postId: String!
    $title: String!
    $description: String!
  ) {
    updatePost(postId: $postId, title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

export const TOGGLE_POST_LIKE_QUERY = gql`
  mutation togglePostLikeQuery($postId: String!) {
    togglePostLikes(postId: $postId) {
      id
      likedBy {
        id
      }
    }
  }
`;
