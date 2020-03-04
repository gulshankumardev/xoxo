const { getUserId } = require('../helpers');

const query = {
  me: async (parent, args, ctx) => {
    const userId = await getUserId(ctx);
    const user = await ctx.prisma.user({ id: userId });
    return user;
  },

  users: async (parent, args, ctx) => {
    const userInfo = await ctx.prisma.users();

    return userInfo;
  },

  posts: async (parent, args, ctx) => {
    const allPosts = await ctx.prisma.posts({ orderBy: 'createdAt_DESC' });

    return allPosts;
  },
};

module.exports = { query };
