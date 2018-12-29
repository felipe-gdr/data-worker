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
    editAlbum(id: ID!, title: String, artist: String): Album
    addReview(albumId: ID!, title: String!, rating: Int!): Review
    addAlbum(title: String!, artist: String!, coverUrl: String!): Album
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
    reviewCount: Int!
  }

  schema {
    query: Query
    subscription: Subscription
    mutation: Mutation
  }
`;
