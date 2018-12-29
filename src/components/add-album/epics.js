import { ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';

import { addAlbumSuccess } from './actions';

import { mutation } from '../../data-worker';

const addAlbumEpic = (action$, state$)=> action$.pipe(
  ofType('ADD_ALBUM_REQUEST'),
  mergeMap(action => {
    const { title, artist, coverUrl } = action.payload;

    return mutation({
      query: `
        mutation {
          addAlbum(
            title: "${title}"
            artist: "${artist}"
            coverUrl: "${coverUrl}"
          ) {
            id
            artist
            title
            coverUrl
          }
        } 
      `
    })
      .pipe(
        map(({ addAlbum }) => addAlbumSuccess(addAlbum))
      )
  })
);

export default addAlbumEpic;
