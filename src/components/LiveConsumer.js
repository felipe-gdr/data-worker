import React, { Component } from 'react';
import dataWorker from '../data-worker';
import { catchError } from 'rxjs/operators';

const query = `
    subscription {
        somethingChanged {
            id
        }
    }
`;

export default class Consumer extends Component {
    state = { data: '' }

    constructor(props) {
      super(props);
      this.dataWorker = dataWorker();

      this.subscription = this.dataWorker.live({ query })
        .pipe(catchError(console.error))
        .subscribe((data) => {
          this.setState({ data: JSON.stringify(data) });
        });
    }

    componentWillUnmount() {
      this.subscription.unsubscribe();
    }

    render() {
      const { data } = this.state;

      return <div>
        <pre>
          {data}
        </pre>
      </div>
    }
}
