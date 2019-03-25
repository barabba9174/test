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
        type: oneOf(['default', 'clear', 'start', 'end', 'path'])
    };

    static defaultProps = {
        type: 'default',
        onClick: () => {},
        children: null
    }

    render() {
        const {
            type = 'default',
            children,
            onClick,
            ...rest
        } = this.props;

        return (
            <ThemeProvider theme={{
                cell: type
            }}>
                <CellWrapper onClick={onClick} {...rest}>
                    {children}
                </CellWrapper>
            </ThemeProvider>
        );
    }
}
