import { connect } from 'react-redux';

import View from './view';

import { fetchAlbumRequest } from '../actions';

export default connect(
  state => ({
    albumId: state.albumId,
    albumDetails: state.albumDetails
  }),
  {
    fetchAlbumRequest,
  }
)(View);
