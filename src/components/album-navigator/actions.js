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

export const markAsFavorite = ({ albumId }) => {
  return ({
    type: 'MARK_AS_FAVORITE',
    payload: { albumId },
  });
}


export const unmarkAsFavorite = ({ albumId }) => ({
  type: 'UNMARK_AS_FAVORITE',
  payload: { albumId },
});

export const toggleFavoriteSuccess = ({ albumId, isFavorite }) => ({
  type: 'TOGGLE_FAVORITE_SUCCESS',
  payload: { albumId, isFavorite },
});
