import React, { Component } from 'react';
import AppView from './views/AppView';
import AppWrapper, {SyledLogo} from './AppWrapper';

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends Component {
    render() {
        return (
            <AppWrapper>
                <SyledLogo src="./Gridster-Logo.png"/>
                <AppView/>

            </AppWrapper>
        );
    }
}
