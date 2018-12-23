import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import epics from './epics';

const epicMiddleware = createEpicMiddleware();

const initialState = {
  albumId: null,
  albumDetails: null,
};

const reducer = (state = initialState,  action) => {
  switch(action.type) {
  case 'REFRESH_APP_PROPS':
    return {...state, albumId: action.payload.albumId}
  case 'FETCH_ALBUM_SUCCESS':
    return {...state, albumDetails: action.payload}
  case 'ADD_REVIEW_SUCCESS':
    return {
      ...state, 
      albumDetails: {
        ...state.albumDetails,
        reviews: [...state.albumDetails.reviews, action.payload],
      } 
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
