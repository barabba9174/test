import React, { Component } from 'react';
// import logo from './logo.svg';
import Button from './components/Button';

import Grid from './components/Grid';

import './App.css';

const rows = 10;
const cells = 10;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Button>Test</Button>
        <Grid rows={rows} cells={cells}></Grid>
       


        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      </div>
    );
  }
}

export default App;
