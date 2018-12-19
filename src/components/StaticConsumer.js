import React, { Component } from 'react';
import dataWorker from '../data-worker';
import { catchError } from 'rxjs/operators';

const query = `
    query {
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

        this.dataWorker.get({ query })
            .pipe(catchError(console.error))
            .subscribe((data) => {
                this.setState({ data: JSON.stringify(data) });
            });
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