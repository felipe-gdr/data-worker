import React, { Component } from 'react';
import './App.css';
import Consumer from './Consumer';
import Modifier from './Modifier';

class App extends Component {
  state = {
    consumers: [],
  }

  render() {
    const { consumers } = this.state;

    return (
      <div className="App">
        <div>
          <h1>Consumers</h1>
          <button onClick={() => this.setState({ consumers: [...consumers, <Consumer />]})}>add consumer</button>
          {
            consumers.map((consumer, idx) => (
              <div 
                key={idx}
                style={{border: '1px dashed red', display: 'flex', justifyContent: 'space-around'}}
              >
                <span>{idx}</span>
                {consumer}
                <button onClick={() => {
                  this.setState({ consumers: consumers.filter(c => c !== consumer)})
                }}>X</button>
              </div>
            ))
          }
          <h1>Modifier</h1>
          <Modifier />
        </div>
      </div>
    );
  }
}

export default App;
