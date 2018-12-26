import { connect } from 'react-redux';

import View from './view';
import { addAlbumRequest } from '../actions';

export default connect(
  state => ({
    isLoading: state.isLoading 
  }),
  {
    addAlbumRequest,
  }
)(View);

