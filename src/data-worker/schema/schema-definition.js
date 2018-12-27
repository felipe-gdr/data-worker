export default `
  type Query {
    somethingChanged: Result
    albums(artistName: String): [Album]
    reviews(albumId: ID!): [Review]
    album(albumId: ID!): [Album]
  }

  type Subscription {
    somethingChanged: Result
    albums(artistName: String): [Album]
  }

  type Result {
    id: String
  }

  type Review {
    id: ID!
    title: String!
    rating: Int!
  }

  type Album {
    title: String!
    artist: String!
    coverUrl: String!
    releaseYear: Int
    reviews: [Review]
    reviewCount: Int!
  }

  schema {
    query: Query
    subscription: Subscription
  }
`;
