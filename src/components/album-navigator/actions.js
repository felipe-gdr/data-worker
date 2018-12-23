export const selectAlbum = album => ({
  type: 'SELECT_ALBUM',
  payload: album,
});

export const fetchAlbumsRequest = () => ({
  type: 'FETCH_ALBUMS_REQUEST',
});

export const fetchAlbumsSuccess = albums => ({
  type: 'FETCH_ALBUMS_SUCCESS',
  payload: albums,
});
