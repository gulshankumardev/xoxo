const { prisma } = require('../prisma/generated-client');
const { query: Query } = require('./query');
const { mutation: Mutation } = require('./mutation');

const resolvers = {
  Query,
  Mutation,
  User: {
    posts: parent => prisma.user({ id: parent.id }).posts(),
  },
  Post: {
    author: parent => prisma.post({ id: parent.id }).author(),
  },
};

module.exports = resolvers;
