import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();

const SOMETHING_CHANGED_TOPIC = 'something_changed';

setInterval(() => {
    pubsub.publish(SOMETHING_CHANGED_TOPIC, {  id: "123" + new Date() });
}, 1000);

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
            resolve: () => ({ id: 'static' }) 
        },
    },
});

const SubscriptionType = new GraphQLObjectType({
    name: 'Subscription',
    fields: {
        somethingChanged: {
            type: ResultType,
            resolve: value => value,
            subscribe: () => {
                return pubsub.asyncIterator(SOMETHING_CHANGED_TOPIC)
            },
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