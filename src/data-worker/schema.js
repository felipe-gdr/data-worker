import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

import { getSomething, subscribeToSomething } from './repository';

const ResultType = new GraphQLObjectType({
    name: 'Result',
    fields: {
        id: {
            type: GraphQLString,
        },
    },
});

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        somethingChanged: {
            type: ResultType,
            resolve: () => getSomething()
        },
    },
});

const SubscriptionType = new GraphQLObjectType({
    name: 'Subscription',
    fields: {
        somethingChanged: {
            type: ResultType,
            resolve: value => value,
            subscribe: () => subscribeToSomething() 
        },
    },
});

export default new GraphQLSchema({
    query: QueryType,
    subscription: SubscriptionType,
});

// export default buildSchema(`
//   type Query {
//     artists(searchQuery: String): [Artist]
//     albums(artistName: String): [Album]
//   }

//   type Subscription {
//       somethingChanged: Result
//   }

//   type Result {
//       id: String
//   }

//   type Artist {
//       name: String
//       albums: [Album]
//   }

//   type Album {
//       title: String
//       artist: Artist
//       releaseYear: Int
//   }
// `); 