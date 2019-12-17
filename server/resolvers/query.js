const query = {
  me: () => {
    return {
      id: 'gk07',
      name: 'Gulshan kumar',
      email: 'kumar.gulshan80@gmail.com',
      password: 's3cur3P@ssw0rd!',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  },

  users: async (parent, args, ctx) => {
    const userInfo = ctx.prisma.users();

    return userInfo;
  },
};

module.exports = { query };
