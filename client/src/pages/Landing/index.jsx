import React from 'react';
import { useQuery } from 'react-apollo';
import Welcome from './Welcome';
import { USER_INFO_QUERY } from '../../gql/queries';
import Posts from '../Posts';

const LandingPage = () => {
  const { data } = useQuery(USER_INFO_QUERY);

  const {
    me: { isLoggedIn },
  } = data;

  return isLoggedIn ? <Posts /> : <Welcome />;
};

export default LandingPage;
