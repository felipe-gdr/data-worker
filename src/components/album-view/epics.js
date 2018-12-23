import { ofType, combineEpics } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import { from } from 'rxjs';

import { fetchAlbumSuccess } from './actions';

import { getAlbum } from '../../data-worker/remote';

const fetchAlbumEpic = (action$, state$)=> action$.pipe(
  ofType('FETCH_ALBUM_REQUEST'),
  mergeMap(action => {
    return from(getAlbum(state$.value.albumId))
      .pipe(
        map(fetchAlbumSuccess)
      )
  }
    
  )
);

export default combineEpics(
  fetchAlbumEpic,
);
