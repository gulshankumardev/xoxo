const { prisma } = require('../prisma/generated-client');
const { query: Query } = require('./query');
const { mutation: Mutation } = require('./mutation');

const resolvers = {
  Query,
  Mutation,
  User: {
    posts: parent => prisma.user({ id: parent.id }).posts(),
    likedPosts: parent => prisma.user({ id: parent.id }).likedPosts(),
  },
  Post: {
    author: parent => prisma.post({ id: parent.id }).author(),
    likedBy: parent => prisma.post({ id: parent.id }).likedBy(),
  },
};

module.exports = resolvers;
