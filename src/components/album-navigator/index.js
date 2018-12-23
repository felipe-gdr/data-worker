import React from 'react';
import { Provider } from 'react-redux';

import View from './view';
import store from './store';

export default () => (
  <Provider store={store}>
    <View /> 
  </Provider>
)

