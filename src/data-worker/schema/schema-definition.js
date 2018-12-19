export default `
  type Query {
    # artists(searchQuery: String): [Artist]
    # albums(artistName: String): [Album]
    somethingChanged: Result
  }

  type Subscription {
      somethingChanged: Result
  }

  type Result {
      id: String
  }

  type Artist {
      name: String
      albums: [Album]
  }

  type Album {
      title: String
      artist: Artist
      releaseYear: Int
  }

  schema {
      query: Query
      subscription: Subscription
  }
`;