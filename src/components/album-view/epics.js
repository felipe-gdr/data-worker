import { ofType, combineEpics } from 'redux-observable';
import { mergeMap, map, takeUntil } from 'rxjs/operators';

import { fetchAlbumSuccess, addReviewSuccess } from './actions';

import { live, mutation } from '../../data-worker';


const fetchAlbumEpic = (action$, state$)=> action$.pipe(
  ofType('FETCH_ALBUM_REQUEST'),
  mergeMap(action => {
    return live({
      query: `
        subscription {
          album(albumId: "${state$.value.albumId}") {
            id
            title
            artist
            coverUrl
            isFavorite
            reviews {
              id
              title
              rating
            }
          }
        }
      `
    })
      .pipe(
        map(data => {
          return fetchAlbumSuccess(data.album);
        }),
        takeUntil(action$.pipe(ofType('REFRESH_APP_PROPS')))
      )
  })
);

const addReviewEpic = (action$, state$)=> action$.pipe(
  ofType('ADD_REVIEW_REQUEST'),
  mergeMap(action => {

    const query = `
      mutation {
        addReview(
          albumId: "${state$.value.albumId}"
          title: "${action.payload.title}"
          rating: ${action.payload.rating}
        ) {
          id
          title
          rating
        }
      }
    `;

    return mutation({ query })
      .pipe(
        map(({ addReview }) => {
          return addReviewSuccess(addReview);
        })
      )
  })
);

export default combineEpics(
  fetchAlbumEpic,
  addReviewEpic
);
