export const addAlbumRequest = album => ({
  type: 'ADD_ALBUM_REQUEST',
  payload: album,
});

export const addAlbumSuccess = album => ({
  type: 'ADD_ALBUM_SUCCESS',
  payload: album,
});
