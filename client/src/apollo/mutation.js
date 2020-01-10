import resetUserInfo from '../utils';
import AUTH_TOKEN from '../utils/constants';

const Mutation = {
  login: (obj, args, context) => {
    const userInfo = resetUserInfo(obj.login.token);
    context.client.writeData({
      data: userInfo,
    });
  },

  signup: (obj, args, context) => {
    const userInfo = resetUserInfo(obj.signup.token);
    context.client.writeData({
      data: userInfo,
    });
  },

  logout: (_, __, context) => {
    localStorage.removeItem(AUTH_TOKEN);

    const userInfo = resetUserInfo();
    context.client.writeData({
      data: userInfo,
    });
  },
};

export default Mutation;
