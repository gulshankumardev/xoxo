import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-apollo';
import { ALL_POSTS_QUERY } from '../../gql/queries';
import Post from './Post';
import Loader from '../../components/Loader';

const NoPostsMsg = () => (
  <p className="lead">
    There is no post published yet, <Link to="/create-post">create one</Link>
  </p>
);

const Posts = () => {
  const { data, loading } = useQuery(ALL_POSTS_QUERY);

  if (loading)
    return (
      <div className="container">
        <Loader small right />
      </div>
    );

  return (
    <div className="container">
      {data && data.posts.length ? (
        data.posts.map(postInfo => <Post key={postInfo.id} info={postInfo} />)
      ) : (
        <NoPostsMsg />
      )}
    </div>
  );
};

export default Posts;
