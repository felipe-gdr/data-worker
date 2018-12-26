import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable'; 

import epics from './epics';

const epicMiddleware = createEpicMiddleware();

const initialState = {
  isLoading: false,
};

const reducer = (state = initialState, action) => { 
  switch(action.type) {
  case 'ADD_ALBUM_REQUEST': 
    return {...state, isLoading: true};
  case 'ADD_ALBUM_SUCCESS': 
    return {...state, isLoading: false};
  default:
    return state;

  }
};

const store = createStore(
  reducer, 
  applyMiddleware(epicMiddleware),
);

epicMiddleware.run(epics);

export default store;
