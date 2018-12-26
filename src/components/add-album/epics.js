import { ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import { from } from 'rxjs';

import { addAlbumSuccess } from './actions';

import { addAlbum } from '../../data-worker/remote';

const addAlbumEpic = (action$, state$)=> action$.pipe(
  ofType('ADD_ALBUM_REQUEST'),
  mergeMap(action => {
    return from(addAlbum(action.payload))
      .pipe(
        map(addAlbumSuccess)
      )
  })
);

export default addAlbumEpic;
