import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import View from './view';

export default () => (
  <Provider store={store}>
    <View />
  </Provider>
)
