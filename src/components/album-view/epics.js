import { ofType, combineEpics } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import { from } from 'rxjs';

import { fetchAlbumSuccess, addReviewSuccess } from './actions';

import { getAlbum, addReview } from '../../data-worker/remote';

const fetchAlbumEpic = (action$, state$)=> action$.pipe(
  ofType('FETCH_ALBUM_REQUEST'),
  mergeMap(action => {
    return from(getAlbum(state$.value.albumId))
      .pipe(
        map(fetchAlbumSuccess)
      )
  })
);

const addReviewEpic = (action$, state$)=> action$.pipe(
  ofType('ADD_REVIEW_REQUEST'),
  mergeMap(action => {
    return from(
      addReview({
        albumId: state$.value.albumId,
        title: action.payload.title,
        rating: action.payload.rating,
      })
    )
      .pipe(
        map(addReviewSuccess)
      )
  })
);

export default combineEpics(
  fetchAlbumEpic,
  addReviewEpic
);
