import { 
  subscribeToAlbums, 
  subscribeToAlbum, 
  addAlbum,  
  editAlbum,  
  addReview, 
  getReviewCount,
  getReviews,
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
    editAlbum: (parent, args) => {
      return editAlbum({ id: args.id, title: args.title, artist: args.artist });
    },
    addReview: (parent, args) => {
      return addReview({ albumId: args.albumId, title: args.title, rating: args.rating });
    },
    addAlbum: (parent, args) => {
      return addAlbum({ title: args.title, artist: args.artist, coverUrl: args.coverUrl });
    }
  },
  Album: {
    reviews: album => {
      if(album.reviews) {
        return album.reviews;
      }

      return getReviews(album.id);
    },
    reviewCount: getReviewCount 
  }
};
