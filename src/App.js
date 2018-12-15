import React, { Component } from 'react';
import './App.css';
import Consumer from './Consumer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <h1>Consumer</h1>
          <Consumer />
        </div>
      </div>
    );
  }
}

export default App;
