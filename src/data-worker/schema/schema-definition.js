export default `
  type Query {
    somethingChanged: Result
    albums(artistName: String): [Album]
    reviews(albumId: ID!): [Review]
    album(albumId: ID!): Album
  }

  type Subscription {
    somethingChanged: Result
    albums(artistName: String): [Album]
    album(albumId: ID!): Album
  }

  type Mutation {
    addReview(albumId: ID!, title: String!, rating: Int!): Review
    addAlbum(title: String!, artist: String!, coverUrl: String!): Album
    markAsFavorite(albumId: ID!): Boolean
    unmarkAsFavorite(albumId: ID!): Boolean
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
    id: ID!
    title: String!
    artist: String!
    coverUrl: String!
    releaseYear: Int
    reviews: [Review]
    isFavorite: Boolean
  }

  schema {
    query: Query
    subscription: Subscription
    mutation: Mutation
  }
`;
