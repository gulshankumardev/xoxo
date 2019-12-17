const { prisma } = require('../prisma/generated-client');
const { query: Query } = require('./query');

const resolvers = {
  Query,
  User: {
    posts: parent => prisma.user({ id: parent.id }).posts(),
  },
  Post: {
    author: parent => prisma.post({ id: parent.id }).author(),
  },
};

module.exports = resolvers;
