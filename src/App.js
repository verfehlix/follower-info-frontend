import React, { Component } from 'react'
import './App.css'

import Header from './Header/Header';
import Graph from './Graph/Graph';
import DiffView from './DiffView/DiffView';

class App extends Component {

  render() {
    return (
      <div className="App">

        <Header />

        <Graph />

        <DiffView />

      </div>
    );
  }
}

export default App
