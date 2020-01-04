const { getUserId } = require('../helpers');

const query = {
  me: async (parent, args, context) => {
    const userId = await getUserId(context);
    const user = await context.prisma.user({ id: userId });
    return user;
  },

  users: async (parent, args, ctx) => {
    const userInfo = ctx.prisma.users();

    return userInfo;
  },
};

module.exports = { query };
