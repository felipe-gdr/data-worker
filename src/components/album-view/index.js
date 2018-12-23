import React, { Component } from 'react';
import { Provider } from 'react-redux'

import store from './store';
import {refreshAppProps } from './actions';
import View from './view';


export default class AlbumView extends Component {

  componentDidUpdate(prevProps) {
    store.dispatch(refreshAppProps(this.props));
  }


  render() {
    return (
      <Provider store={store}>
        <View /> 
      </Provider>
    )
  }
};
