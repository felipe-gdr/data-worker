import { EventEmitter } from 'events';

import * as remote from './remote';

const ADD_ALBUM_TOPIC = 'topic:albums:add';
const ADD_REVIEW_TOPIC = 'topic:albums:add-review';
const GET_REVIEWS_TOPIC = 'topic:albums:get-reviews';
const TOGGLE_FAVORITE_TOPIC = 'topic:albums:toggle-favorite';

const eventEmitter = new EventEmitter();

const cache = {
  albums: [],
  favorites: [],
};

export const addAlbum = async (album) => {
  const result = await remote.addAlbum(album);

  eventEmitter.emit(ADD_ALBUM_TOPIC, result);

  return result;
}

export const getFavorites = async () => {
  const favorites = await remote.getFavorites();

  cache.favorites = favorites;

  return favorites;
}

export const markAsFavorite = async albumId => {
  await remote.markAsFavorite({ albumId });

  eventEmitter.emit(TOGGLE_FAVORITE_TOPIC, { albumId, isFavorite: true });
};

export const unmarkAsFavorite = async albumId => {
  await remote.unmarkAsFavorite({ albumId });

  eventEmitter.emit(TOGGLE_FAVORITE_TOPIC, { albumId, isFavorite: false });
};

export const addReview = async review => {
  const result = await remote.addReview(review);

  eventEmitter.emit(ADD_REVIEW_TOPIC, result);

  return result;
};

export const getReviews = async albumId => {
  const result = await remote.getReviews(albumId);

  eventEmitter.emit(GET_REVIEWS_TOPIC, { albumId, reviews: result });

  return result;
}

export const subscribeToAlbums = async () => {
  // holds data that will be processed
  const pushQueue = [];
  // holds resolve() functions that will process data
  const pullQueue = [];

  let done = false;

  const pushValue = (data) => {
    if (pullQueue.length !== 0) {
      const nextResolve = pullQueue.shift();
      nextResolve({ done, value: data});
    } else {
      pushQueue.push(data);
    }
  }

  // Send cached albums
  pushQueue.push(cache.albums);

  // Send remote albums 
  const albums = await remote.getAllAlbums(); 
    
  pushQueue.push(albums);

  // Update cache
  cache.albums = albums;

  const pullValue = () => {
    return new Promise(resolve => {
      const nextData = pushQueue.shift();

      if (nextData) {
        resolve({ done, value: nextData});
      } else {
        pullQueue.push(resolve);
      }
    });
  }

  const addAlbumHandler = async album => {
    albums.push(album); 
    pushValue(albums);
  }

  const addReviewHandler = async review => {
    const album = albums.find(a => a.id === review.albumId);

    album.reviews.push(review);
    
    pushValue(albums);
  }

  const getReviewsHandler = async ({ albumId, reviews }) => {
    const album = albums.find(a => a.id === albumId);

    album.reviews = reviews;
    
    pushValue(albums);
  }

  eventEmitter.addListener(ADD_ALBUM_TOPIC, addAlbumHandler);
  eventEmitter.addListener(ADD_REVIEW_TOPIC, addReviewHandler);
  eventEmitter.addListener(GET_REVIEWS_TOPIC, getReviewsHandler);

  return {
    [Symbol.asyncIterator]() {
      return this
    },
    next: () => pullValue(),
    return: () => {
      done = true;
      eventEmitter.removeListener(ADD_ALBUM_TOPIC, getReviewsHandler);
      eventEmitter.removeListener(ADD_REVIEW_TOPIC, addReviewHandler);
      eventEmitter.removeListener(GET_REVIEWS_TOPIC, getReviewsHandler);
      return Promise.resolve({ done });
    },
    throw: (error) => {
      done = true;
      eventEmitter.removeListener(ADD_ALBUM_TOPIC, getReviewsHandler);
      eventEmitter.removeListener(ADD_REVIEW_TOPIC, addReviewHandler);
      eventEmitter.removeListener(GET_REVIEWS_TOPIC, getReviewsHandler);
      return ({ done, value: Promise.reject(error) })
    }
  }
}

export const subscribeToAlbum = async albumId => {
  // holds data that will be processed
  const pushQueue = [];
  // holds resolve() functions that will process data
  const pullQueue = [];

  let done = false;

  const pushValue = (data) => {
    if (pullQueue.length !== 0) {
      const nextResolve = pullQueue.shift();
      nextResolve({ done, value: data});
    } else {
      pushQueue.push(data);
    }
  }

  // Send cached album
  pushQueue.push(cache.albums.find(a => a.id === albumId));

  // Send remote album
  const album = await remote.getAlbum(albumId); 
    
  pushQueue.push(album);

  // Update cache
  cache.albums[albumId] = album;

  const pullValue = () => {
    return new Promise(resolve => {
      const nextData = pushQueue.shift();

      if (nextData) {
        resolve({ done, value: nextData});
      } else {
        pullQueue.push(resolve);
      }
    });
  }

  const toggleFavoriteHandler = async ({ albumId: albumIdToggled, isFavorite }) => {
    if(albumId === albumIdToggled) {
      const album = cache.albums.find(a => a.id === albumId);

      album.isFavorite = isFavorite;
      
      pushValue(album);
    }
  }

  eventEmitter.addListener(TOGGLE_FAVORITE_TOPIC, toggleFavoriteHandler);

  return {
    [Symbol.asyncIterator]() {
      return this
    },
    next: () => pullValue(),
    return: () => {
      eventEmitter.removeListener(TOGGLE_FAVORITE_TOPIC, toggleFavoriteHandler);
      done = true;
      return Promise.resolve({ done });
    },
    throw: (error) => {
      done = true;
      return ({ done, value: Promise.reject(error) })
    }
  }
}
