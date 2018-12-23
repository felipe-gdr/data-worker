import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';

import typeDefs from './schema-definition';

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
