import { graphql, subscribe, parse } from 'graphql';
import { from, throwError, of, Observable } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { forAwaitEach } from 'iterall';

import schema from './schema';

export const get = ({ query }) => {
  return from(graphql(schema, query))
    .pipe(
      mergeMap(({ errors, data }) => {
        if (errors) {
          return throwError(errors[0]);
        }

        return of(data);
      })
    );
}

export const live = ({ query }) => {
  return from(subscribe(schema, parse(query)))
    .pipe(
      mergeMap(asyncIterator => {
        return Observable.create(observer => {
          forAwaitEach(asyncIterator, item => {
            const { errors, data }  = item;
            if (errors) {
              return observer.error(errors[0]);
            }
            observer.next(data);
          })

          return () => asyncIterator.return();
        })
      })
    );
};

export const mutation = ({ query }) => {
  return from(graphql(schema, query))
    .pipe(
      mergeMap(({ errors, data }) => {
        if (errors) {
          return throwError(errors[0]);
        }

        return of(data);
      })
    );
}
