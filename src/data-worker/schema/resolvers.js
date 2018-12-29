import { 
  subscribeToAlbums, 
  subscribeToAlbum, 
  addAlbum,  
  addReview, 
  getReviews,
  getFavorites,
  markAsFavorite,
  unmarkAsFavorite,
} from '../albums-resolver';

import * as remote from '../remote';

export default {
  Query: {
    albums: remote.getAllAlbums,
    album: ({ albumId }) => remote.getAlbum(albumId),
  },
  Subscription: {
    albums: {
      subscribe: subscribeToAlbums,
      resolve: value => value
    },
    album: {
      subscribe: (_, args) => subscribeToAlbum(args.albumId),
      resolve: value => value
    },
  },
  Mutation: {
    addReview: (parent, args) => {
      return addReview({ albumId: args.albumId, title: args.title, rating: args.rating });
    },
    addAlbum: (parent, args) => {
      return addAlbum({ title: args.title, artist: args.artist, coverUrl: args.coverUrl });
    },
    markAsFavorite: (parent, args) => {
      return markAsFavorite(args.albumId);
    },
    unmarkAsFavorite: (parent, args) => {
      return unmarkAsFavorite(args.albumId);
    }
  },
  Album: {
    reviews: album => {
      if(album.reviews) {
        return album.reviews;
      }

      return getReviews(album.id);
    },
    isFavorite: async album => {
      if(album.isFavorite !== undefined) {
        return album.isFavorite;
      }

      const favorites = await getFavorites();

      return favorites && favorites.includes(album.id);
    }
  }
};
