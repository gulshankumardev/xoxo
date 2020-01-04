const {
  createEncryptedPassword,
  createSignedToken,
  validatePassword,
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
};

module.exports = { mutation };
