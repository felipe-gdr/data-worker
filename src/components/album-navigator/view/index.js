import { connect } from 'react-redux';

import View from './view';
import { 
  selectAlbum, 
  fetchAlbumsRequest, 
  markAsFavorite, 
  unmarkAsFavorite 
} from '../actions';

export default connect(
  state => ({
    albums: state.albums,
    selectedAlbum: state.selectedAlbum
  }),
  {
    selectAlbum,
    fetchAlbumsRequest,
    markAsFavorite,
    unmarkAsFavorite,
  }
)(View);

