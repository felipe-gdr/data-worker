import { ofType, combineEpics } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';

import { fetchAlbumsSuccess } from './actions';

import { live } from '../../data-worker';

const query = `
  subscription {
    albums {
      id
      title
      artist
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

export default combineEpics(
  fetchAlbumsEpic,
);
