const { GraphQLServer } = require('graphql-yoga');
const resolvers = require('./resolvers');

// load environment variables
require('dotenv').config();

const server = new GraphQLServer({
  typeDefs: './server/schema.graphql',
  resolvers,
});

const options = {
  port: process.env.YOGA_PORT,
  endpoint: '/graphql',
  playground: '/playground',
};

server.start(options, ({ port }) =>
  console.log(`Server is running on http://localhost:${port}/playground`),
);
