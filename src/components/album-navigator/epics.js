import { ofType, combineEpics } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import { from } from 'rxjs';

import { fetchAlbumsSuccess } from './actions';

import { getAllAlbums } from '../../data-worker/remote';

const fetchAlbumsEpic = action$ => action$.pipe(
  ofType('FETCH_ALBUMS_REQUEST'),
  mergeMap(() => from(getAllAlbums())
    .pipe(
      map(fetchAlbumsSuccess)
    )
  )
);

export default combineEpics(
  fetchAlbumsEpic,
);
