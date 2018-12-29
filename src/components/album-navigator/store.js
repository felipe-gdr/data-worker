import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import epics from './epics';

const epicMiddleware = createEpicMiddleware();

const initialState = {
  albums: [],
  selectedAlbum: null,
};


const reducer = (state = initialState,  action) => {
  switch(action.type) {
  case 'SELECT_ALBUM': 
    return {...state, selectedAlbum: action.payload.albumId}
  case 'FETCH_ALBUMS_REQUEST': {
    return state;
  }
  case 'FETCH_ALBUMS_SUCCESS': 
    return {...state, albums: action.payload}
  case 'TOGGLE_FAVORITE_SUCCESS':  {
    const { albumId, isFavorite } = action.payload;

    const updatedAlbums = [...state.albums];

    const album = updatedAlbums.find(a => a.id === albumId);

    album.isFavorite = isFavorite;

    return {...state, albums: updatedAlbums}
  }
  default:
    return state;
  }
}


const store = createStore(
  reducer,
  applyMiddleware(epicMiddleware),
);

epicMiddleware.run(epics);

export default store;
