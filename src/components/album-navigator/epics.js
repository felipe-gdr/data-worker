import { ofType, combineEpics } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';

import { fetchAlbumsSuccess, toggleFavoriteSuccess } from './actions';

import { live, mutation } from '../../data-worker';

const query = `
  subscription {
    albums {
      id
      title
      artist
      isFavorite
      reviews {
        id
        rating
      }
    }
  }
`;

const fetchAlbumsEpic = action$ => action$.pipe(
  ofType('FETCH_ALBUMS_REQUEST'),
  mergeMap(() => live({ query })
    .pipe(
      map(data => fetchAlbumsSuccess(data.albums)),
    )
  )
);

const markAsFavoriteEpic = action$ => action$.pipe(
  ofType('MARK_AS_FAVORITE'),
  mergeMap(action => mutation({ 
    query: `
      mutation {
        markAsFavorite(albumId: "${action.payload.albumId}")
      }
    `
  })
    .pipe(
      map(() => toggleFavoriteSuccess({ albumId: action.payload.albumId, isFavorite: true })),
    )
  )
);

const unmarkAsFavoriteEpic = action$ => action$.pipe(
  ofType('UNMARK_AS_FAVORITE'),
  mergeMap(action => mutation({ 
    query: `
      mutation {
        unmarkAsFavorite(albumId: "${action.payload.albumId}")
      }
    `
  })
    .pipe(
      map(() => toggleFavoriteSuccess({ albumId: action.payload.albumId, isFavorite: false })),
    )
  )
);

export default combineEpics(
  fetchAlbumsEpic,
  markAsFavoriteEpic,
  unmarkAsFavoriteEpic,
);
