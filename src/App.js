import React, { Component } from 'react';

import AppView from './views/AppView';
import AppWrapper, { SyledLogo } from './AppWrapper';

export default class App extends Component {
  render() {
    return (
      <AppWrapper>
        <SyledLogo src="./Gridster-Logo.png" />
        <AppView />
       
      </AppWrapper>
    );
  }
}

