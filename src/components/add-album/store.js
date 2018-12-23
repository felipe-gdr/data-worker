import { createStore } from 'redux';

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

export default createStore(
  reducer, 
);
