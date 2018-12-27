import { getSomething, subscribeToSomething } from '../repository';
import { subscribe as subscribeToAlbums } from '../album-resolver';

import * as remote from '../remote';

export default {
  Query: {
    somethingChanged: getSomething,
    albums: remote.getAllAlbums,
    album: ({ albumId }) => remote.getAlbum(albumId),
  },
  Subscription: {
    somethingChanged: {
      subscribe: subscribeToSomething,
      resolve: value => value
    },
    albums: {
      subscribe: subscribeToAlbums,
      resolve: value => value
    },
  },
  Album: {
    reviews: album => remote.getReviews(album.id) 
  }
};
