import React, {Component} from 'react';
import Cell from '../Cell';
import {pathFinder} from './utils';

import {
    oneOfType,
    func,
    node,
    element,
    bool,
    number
} from 'prop-types';
import GridWrapper, {AriaResult} from './GridWrapper';

export default class Grid extends Component {
    static propTypes = {
        children: oneOfType([node, element, func]),
        onClick: func,
        reload: bool,
        rows: number,
        cols: number
    };

    constructor({rows, cols}) {
        super();

        this.state = this.initializeStage({rows, cols})

    }

    componentDidUpdate(prevProps) {
        const {rows, cols, reload} = this.props;
        if (rows !== prevProps.rows || cols !== prevProps.cols || reload !== prevProps.reload) {
            this.setState(this.initializeStage({rows, cols}))
        }
    }

    initializeStage = ({rows, cols}) => {
        const start = Math.floor((Math.random() * (rows)));
        const end = Math.floor((Math.random() * (rows)));
        return {
            grid: this.createGrid(rows, cols, start, end),
            start,
            end,
            bestPath: []
        }
    }

    handleClick = (row, cell) => {
        const {grid} = this.state;
        const updateGrid = [...grid];
        const gridValue = updateGrid[row][cell];
        updateGrid[row][cell] = (gridValue === 'default')
            ? 'clear'
            : 'default';;
        this.setState({
            grid: updateGrid
        }, () => this.startNavigation(updateGrid));

    }

    createGrid = (rows, cells, start, end) => {
        return Array
            .from(Array(rows))
            .map((row, irow) => (Array.from(Array(cells)).map((cell, icell) => {
                if (icell === 0 && irow === start) {
                    return 'start';
                }

                if (icell === (cells - 1) && irow === end) {
                    return 'end';
                }
                return 'default';
            })));

    }

    startNavigation = (grid) => {
        const {start} = this.state;
        const queue = ['start'];
        const bestPath = pathFinder(grid, start, 0, queue, []);
        this.setState({bestPath})
    }

    getAccessibilityAttributes = (row, col, cell) => {
        const title = (cell === 'start' || cell === 'end')
            ? cell
            : `${row}_${col}`;
        return {
            title: title,
            'aria-label': title,
            disabled: (cell === 'start' || cell === 'end'),
            'aria-pressed': (cell === 'start' || cell === 'end' || cell === 'clear'),
            'aria-describedby': "statusDescription"
        }
    }

    render() {
        const {grid, bestPath, start, end} = this.state;
        const {cols, rows} = this.props;
        const ariaResultLabel = `Best path found: ${bestPath.join(', ')}`;

        return (
            <div>
                <AriaResult>
                    <ul id="statusDescription">
                        <li>Start position {start}_0</li>
                        <li>End position {end}_{cols - 1}</li>
                        <li>Grid size {rows} x {cols}</li>
                    </ul>
                </AriaResult>
                <AriaResult aria-live="polite">
                    {bestPath.length > 0 && (
                        ariaResultLabel
                    )}
                </AriaResult>
                <GridWrapper
                    theme={{
                    button: 'default'
                }}
                    colsNumber={cols}>
                    {grid.map((row, irow) => (row.map((cell, icol) => 
                        <Cell
                            key={`cell${irow}_${icol}`}
                            type={(bestPath.includes(`${irow}_${icol}`))
                            ? 'path'
                            : cell}
                            onClick={() => this.handleClick(irow, icol)}
                            {...this.getAccessibilityAttributes(irow, icol, cell)}
                        />)))}
                </GridWrapper>
            </div>

        );
    }
}
