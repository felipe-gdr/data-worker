import React, { Component } from 'react';
import dataWorker from './data-worker';
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
    }

    getData = () => {
        this.dataWorker.subscribe({ query })
            .pipe(catchError(console.error))
            .subscribe((data) => {
                this.setState({ data: JSON.stringify(data) });
            });
    }

    render() {
        const { data } = this.state;

        return <div>
            <button onClick={this.getData}>get data</button>
            <pre>
                {data}
            </pre>
        </div>
    }
}