import React, { Component } from 'react';
import AppView from './views/AppView';
import AppWrapper, { SyledLogo, TitleStyled} from './AppWrapper';

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends Component {
    render() {
        return (
            <AppWrapper>
                <SyledLogo alt="Gridster" src="./Gridster-Logo.png"/>
                <TitleStyled>Gridster</TitleStyled>
                <AppView/>

            </AppWrapper>
        );
    }
}
