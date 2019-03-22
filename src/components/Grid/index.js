import React, { PureComponent } from 'react';
import Cell from '../Cell';
import { findShortestPath } from './utils';

import {
    oneOfType, func, node, element
} from 'prop-types';
import GridWrapper from './GridWrapper';

export default class Button extends PureComponent {
    static propTypes = {
        children: oneOfType([node, element, func]),
        onClick: func
    };

    constructor({ rows, cells }) {
        super();
        const start = Math.floor((Math.random() * rows) + 1);
        const end = Math.floor((Math.random() * rows) + 1);
        this.state = { gridArray: this.createGrid(rows, cells, start, end)}
        this.calculateLocation(start);
    }


    handleClick = (row, cell) => {
        const { gridArray } = this.state;
        const updateGrid = [...gridArray];
        const gridValue = updateGrid[row][cell];
        updateGrid[row][cell] = (gridValue === 'default') ? 'clear' : 'default';
        this.setState({ grid: updateGrid });
    }

    createGrid = (rows, cells, start, end) => {
       
        return Array
            .from(Array(rows))
            .map((row, irow) => (
                Array
                    .from(Array(cells)).map(
                        (cell, icell) => {
                            if (icell === 0 && irow === start) {
                                return 'start';
                            }
                            if (icell === (rows - 1) && irow === end) {
                                return 'end';
                            }
                            return 'default';
                        }
                    )

            ));
            
    }


    calculateLocation = (start) => {
        const { gridArray } = this.state;
        const gridCopy = [...gridArray];
        const myPath = findShortestPath([start, 0], gridCopy);
    }


    render() {
        const { gridArray } = this.state;
        

        return (
            <GridWrapper theme={{ button: 'default' }}>
                {gridArray.map((row, irow) => (
                    row.map((cell, icell) => <Cell
                            key={`cell${irow}_${icell}`}
                            type={cell}
                        onClick={(cell === 'start' || cell === 'end') ? null : () => this.handleClick(irow, icell)}
                        />
                    )

                    ))}
            </GridWrapper>
        );
    }
}
