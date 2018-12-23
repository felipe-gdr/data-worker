import React, { Component } from 'react';
import './App.css';
import LiveConsumer from './LiveConsumer';
import StaticConsumer from './StaticConsumer';
import Modifier from './Modifier';

class App extends Component {
  state = {
    liveConsumers: [],
    staticConsumers: [],
  }

  render() {
    const { liveConsumers, staticConsumers } = this.state;

    return (
      <div className="App">
        <div>
          <h1>Live Consumers</h1>
          <button onClick={() => this.setState({ liveConsumers: [...liveConsumers, <LiveConsumer />]})}>add live consumer</button>
          {
            liveConsumers.map((consumer, idx) => (
              <div 
                key={idx}
                style={{border: '1px dashed red', display: 'flex', justifyContent: 'space-around'}}
              >
                <span>{idx}</span>
                {consumer}
                <button onClick={() => {
                  this.setState({ liveConsumers: liveConsumers.filter(c => c !== consumer)})
                }}>X</button>
              </div>
            ))
          }


          <h1>Static Consumers</h1>
          <button onClick={() => this.setState({ staticConsumers: [...staticConsumers, <StaticConsumer />]})}>add static consumer</button>
          {
            staticConsumers.map((consumer, idx) => (
              <div 
                key={idx}
                style={{border: '1px dashed red', display: 'flex', justifyContent: 'space-around'}}
              >
                <span>{idx}</span>
                {consumer}
                <button onClick={() => {
                  this.setState({ staticConsumers: staticConsumers.filter(c => c !== consumer)})
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
