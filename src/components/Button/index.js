import React, { PureComponent } from 'react';
import { ThemeProvider } from 'styled-components';
import {
    oneOfType, func, node, element
} from 'prop-types';
import ButtonWrapper from './ButtonWrapper';

export default class Button extends PureComponent {
    static propTypes = {
        children: oneOfType([node, element, func]),
        onClick: func
    };

    
    render() {
        const {onClick, children, ...rest
        } = this.props;

      

        return (
            <ThemeProvider theme={{ button: 'default' }}>
                <ButtonWrapper onClick={onClick} {...rest}>
                    {children}
                </ButtonWrapper>
            </ThemeProvider>
        );
    }
}
