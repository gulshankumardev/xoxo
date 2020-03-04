const {
  createEncryptedPassword,
  createSignedToken,
  validatePassword,
  getUserId,
} = require('../helpers');

const mutation = {
  signup: async (parent, { name, email, password }, ctx) => {
    const hashedPass = await createEncryptedPassword(password);

    try {
      const user = await ctx.prisma.createUser({
        name,
        email,
        password: hashedPass,
      });

      const token = createSignedToken(user.id);

      return {
        user,
        token,
      };
    } catch (err) {
      throw new Error(err);
    }
  },

  login: async (parent, { email, password }, ctx) => {
    // get user by email
    const user = await ctx.prisma.user({ email });

    // user doesn't exist
    if (!user) {
      throw new Error("Couldn't find your account.");
    }

    const isValidPass = await validatePassword(password, user.password);
    if (!isValidPass) {
      throw new Error('Incorrect password.');
    }

    const token = createSignedToken(user.id);

    return {
      user,
      token,
    };
  },

  createPost: async (_, { title, description }, ctx) => {
    const userId = await getUserId(ctx);

    const post = await ctx.prisma.createPost({
      title,
      description,
      author: {
        connect: {
          id: userId,
        },
      },
    });

    return post;
  },

  updatePost: async (_, { postId, ...restParams }, ctx) => {
    const userId = await getUserId(ctx);

    const postAuthor = await ctx.prisma.post({ id: postId }).author();
    if (!postAuthor) throw new Error("Requested post doesn't exist");

    if (userId !== postAuthor.id) throw new Error('Not authorized!');

    const post = await ctx.prisma.updatePost({
      data: restParams,
      where: {
        id: postId,
      },
    });

    return post;
  },

  deletePost: async (_, { postId }, ctx) => {
    const userId = await getUserId(ctx);

    const postAuthor = await ctx.prisma.post({ id: postId }).author();
    if (!postAuthor) throw new Error("Requested post doesn't exist");

    if (userId !== postAuthor.id) throw new Error('Not authorized!');

    const post = await ctx.prisma.deletePost({ id: postId });

    return post;
  },

  togglePostLikes: async (_, { postId }, ctx) => {
    const userId = await getUserId(ctx);

    const postAuthor = await ctx.prisma.post({ id: postId }).author();
    if (!postAuthor) throw new Error("Requested post doesn't exist");

    const likedByUsers = await ctx.prisma.post({ id: postId }).likedBy();

    const likedOrDislike = likedByUsers.some(user => user.id === userId)
      ? { disconnect: { id: userId } }
      : { connect: { id: userId } };

    const post = ctx.prisma.updatePost({
      where: { id: postId },
      data: { likedBy: likedOrDislike },
    });

    return post;
  },
};

module.exports = { mutation };
