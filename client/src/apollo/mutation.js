import resetUserInfo from '../utils';

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
};

export default Mutation;
