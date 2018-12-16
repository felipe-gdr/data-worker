import React, { Component } from 'react';

import { changeSomething } from './data-worker/repository';

export default class Consumer extends Component {
    state = { text: '' }

    handleChangeText = ({ target }) => {
        this.setState({ text: target.value });
    }

    changeData = () => {
        changeSomething(this.state.text);
    }

    render() {
        const { text } = this.state;

        return <div>
            <input 
                value={text} 
                onChange={this.handleChangeText} 
                placeholder="Change text" 
            />
            <button onClick={this.changeData}>change data</button>
        </div>
    }
}