const { GraphQLServer } = require('graphql-yoga');
const resolvers = require('./resolvers');
const { prisma } = require('./prisma/generated-client');

// load environment variables
require('dotenv').config();

const server = new GraphQLServer({
  typeDefs: './server/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    prisma,
  }),
});

const options = {
  port: process.env.YOGA_PORT,
  endpoint: '/graphql',
  playground: '/playground',
};

server.start(options, ({ port }) =>
  console.log(`Server is running on http://localhost:${port}/playground`),
);
