import React from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQuery } from 'react-apollo';
import { Link } from 'react-router-dom';
import {
  DELETE_POST_MUTATION,
  TOGGLE_POST_LIKE_QUERY,
} from '../../gql/mutations';
import Loader from '../../components/Loader';
import { ALL_POSTS_QUERY, USER_INFO_QUERY } from '../../gql/queries';

const Post = ({
  info: {
    id,
    title,
    description,
    author: { id: authorId, name: authorName },
    likedBy,
  },
}) => {
  const {
    data: {
      me: { userId: activeUserId },
    },
  } = useQuery(USER_INFO_QUERY);

  const isUserPost = authorId === activeUserId;

  let isLiked = false;
  if (likedBy.length) {
    isLiked = !!likedBy.filter(user => user.id === activeUserId).length;
  }

  const [deletePostMutation, { loading }] = useMutation(DELETE_POST_MUTATION, {
    update: (store, { data: { deletePost } }) => {
      const { id: postId } = deletePost;
      const { posts } = store.readQuery({ query: ALL_POSTS_QUERY });

      const updateData = {
        posts: posts.filter(post => post.id !== postId),
      };

      store.writeQuery({
        query: ALL_POSTS_QUERY,
        data: updateData,
      });
    },
  });

  const deletePostRequest = () => {
    deletePostMutation({
      variables: {
        postId: id,
      },
    });
  };

  const [togglePostLike] = useMutation(TOGGLE_POST_LIKE_QUERY);

  const handleLikeDislike = () => {
    togglePostLike({
      variables: {
        postId: id,
      },
    });
  };

  return (
    <div className="post">
      {isUserPost && (
        <button
          type="button"
          className="btn float-right text-black-50"
          onClick={deletePostRequest}
        >
          {loading ? <Loader small /> : <span>&times;</span>}
        </button>
      )}
      <h4>
        {title}
        {isUserPost && (
          <Link to={`update-post/${id}`} className="edit-btn">
            <span role="img" aria-label="image">
              ✏️
            </span>
          </Link>
        )}
      </h4>
      <p>{description}</p>
      <p className="text-black-50 position-relative">
        <button
          type="button"
          className={`btn-like ${isLiked ? 'active' : ''}`}
          onClick={handleLikeDislike}
        >
          &hearts;
        </button>

        <small className="ml-4">
          By: <strong>{authorName}</strong>
        </small>
      </p>
    </div>
  );
};

Post.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    author: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    likedBy: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export default Post;
