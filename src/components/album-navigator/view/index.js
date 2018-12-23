import { connect } from 'react-redux';

import View from './view';
import { selectAlbum, fetchAlbumsRequest } from '../actions';

export default connect(
  state => ({
    albums: state.albums,
    selectedAlbum: state.selectedAlbum
  }),
  {
    selectAlbum,
    fetchAlbumsRequest,
  }
)(View);

