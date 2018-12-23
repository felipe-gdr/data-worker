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

export const addReviewRequest = ({ title, rating }) => ({
  type: 'ADD_REVIEW_REQUEST',
  payload: {
    title,
    rating
  },
});

export const addReviewSuccess = review => ({
  type: 'ADD_REVIEW_SUCCESS',
  payload: review,
});
