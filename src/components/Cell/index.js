import React, { PureComponent } from 'react';
import { ThemeProvider } from 'styled-components';
import {
    oneOfType, func, node, element, oneOf
} from 'prop-types';
import CellWrapper from './CellWrapper';

export default class Cell extends PureComponent {
    static propTypes = {
        children: oneOfType([node, element, func]),
        onClick: func,
        type: oneOf(['default', 'clear', 'start', 'end', 'path']),
       
    };

    static defaultProps = {
        type: 'default'
    }

    
    render() {
        const {
            type = 'default', className = '', children, onClick} = this.props;


        return (
            <ThemeProvider theme={{ cell: type }}>
                <CellWrapper className={className} onClick={onClick}>
                    {children}
                </CellWrapper>
            </ThemeProvider>
        );
    }
}
