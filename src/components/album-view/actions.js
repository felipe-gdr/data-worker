export const refreshAppProps = props => ({
  type: 'REFRESH_APP_PROPS',
  payload: props,
});

export const fetchAlbumRequest = () => ({
  type: 'FETCH_ALBUM_REQUEST',
});

export const fetchAlbumSuccess = albumDetails => ({
  type: 'FETCH_ALBUM_SUCCESS',
  payload: albumDetails,
});
