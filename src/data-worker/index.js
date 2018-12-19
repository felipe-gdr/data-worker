import { graphql, subscribe, parse } from 'graphql';
import { from, throwError, of, Observable } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { forAwaitEach } from 'iterall';

import schema from './schema';

const get = ({ query }) => {
    return from(graphql(schema, query))
        .pipe(
            mergeMap(({ errors, data }) => {
                if (errors) {
                    return throwError(errors);
                }

                return of(data);
            })
        );
}

const live = ({ query }) => {
    return from(subscribe(schema, parse(query)))
        .pipe(
            mergeMap(asyncIterator => {
                return Observable.create(observer => {
                    forAwaitEach(asyncIterator, item => {
                        const { errors, data }  = item;
                        if (errors) {
                            // TODO: errors is always undefined, even when the query has syntax errors
                            return observer.throw(errors);
                        }
                        observer.next(data);
                    })

                    return () => asyncIterator.return();
                })
            })
        );
};

export default () => {
    return {
        get,
        live,
    };
}