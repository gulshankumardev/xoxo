import AUTH_TOKEN from './constants';

const resetUserInfo = token => {
  if (token) localStorage.setItem(AUTH_TOKEN, token);
  const authToken = token || localStorage.getItem(AUTH_TOKEN);
  const userId = authToken && JSON.parse(atob(authToken.split('.')[1])).userId;

  const userInfo = {
    me: {
      userId,
      isLoggedIn: !!authToken,
      __typename: 'User',
    },
  };

  return userInfo;
};

export default resetUserInfo;
