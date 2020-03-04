import React from 'react';
import { useQuery } from 'react-apollo';
import { USER_PROFILE_QUERY } from '../../gql/queries';
import Loader from '../../components/Loader';
import profileImage from '../../media/images/profile.gif';

const Profile = () => {
  const { data, loading } = useQuery(USER_PROFILE_QUERY, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return (
      <div className="text-center">
        <Loader small />
      </div>
    );
  }

  const {
    me: { name, email, posts, likedPosts },
  } = data;

  return (
    <div className="container text-center">
      <figure className="profile-pic">
        <img src={profileImage} alt="profile_pic" className="img-fluid" />
      </figure>
      <h4 className="lead">{name}</h4>
      <p>
        <a className="text-info" href={`mailto:${email}`}>
          {email}
        </a>
        <br />
        <small className="text-secondary">
          Posts: {posts.length}
          <br />
          Liked: {likedPosts.length}
        </small>
      </p>
    </div>
  );
};

export default Profile;
