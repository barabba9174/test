import React, {PureComponent} from 'react';
import Cell from '../Cell';
import {cardinals, getForwardCoordsFromQuadrant, findShortestPath, bfs} from './utils';
import AStarFinder from './utils/AStarFinder';

import {oneOfType, func, node, element} from 'prop-types';
import GridWrapper from './GridWrapper';

export default class Button extends PureComponent {
    static propTypes = {
        children: oneOfType([node, element, func]),
        onClick: func
    };

    constructor({rows, cells}) {
        super();
        const start = Math.floor((Math.random() * (rows - 1)) + 1);
        const end = Math.floor((Math.random() * (rows - 1)) + 1);

        this.state = {
            grid: this.createGrid(rows, cells, start, end),
            start,
            end,
            bestPath: [],
            graph: this.createGraph(rows, cells, start, end)
        }

    }

    checkPath = (prevX, prevY, evaluate, path) => {
        // cardinals.some((card, i) => {     evaluate[i] = [];     const { x, y } =
        // getForwardCoordsFromQuadrant(card, prevX, prevY);     if
        // (path.includes(`${y}_${x}`)) {         if
        // (!evaluate[i].includes(`${y}_${x}`)) {
        // evaluate[i].push(`${y}_${x}`);             this.checkPath(x, y, evaluate[i],
        // path);         };     };     return false; }); return evaluate;
    }

    navigateCardinals = (posX, posY, grid, evaluate) => {
        cardinals.some((card) => {
            const {x, y} = getForwardCoordsFromQuadrant(card, posX, posY);
            if (grid[y] && grid[y][x]) {
                if (grid[y][x] === 'default') 
                    return false;
                const cellName = (grid[y][x] === 'start' || grid[y][x] === 'end')
                    ? grid[y][x]
                    : `${y}_${x}`;
                if (!evaluate.includes(cellName)) {
                    evaluate.push(cellName);

                    if (grid[y][x] === 'clear') {
                        const testBeforeMoving = this.navigateCardinals(x, y, grid, evaluate)
                        return this.navigateCardinals(x, y, grid, evaluate)

                    }
                    return false;

                };
                return false;
            };

        });
        if (evaluate.includes('end')) {
            return evaluate.sort((a, b) => (a > b));
        }
    }

    checkNeighbour = (posX, posY, paths) => {
        const {grid} = this.state;
        const path = this.navigateCardinals(posX, posY, grid, [], paths);
        if (path) {
            const myNewPath = path.filter(el => el !== 'start');
            const pathEvaluated = this.checkPath(posX, posY, [], myNewPath);
            console.log(pathEvaluated)

            // console.log(pathEvaluated) this.setState({ paths: [pathEvaluated] }) const
            // startPosition = path.indexOf('start'); const endPosition =
            // path.indexOf('start'); // const filteredPath = (startPosition > 1 ||
            // startPosition === -1) ? path : [...path].splice(startPosition, path.length);
            // // const filteredEnd = (endPosition === -1) ? path :
            // [...path].splice(endPosition, filteredPath.length); const filteredEnd = path;
            // const filteredPaths = [...paths].filter(el => el.toString() !==
            // filteredEnd.toString()) const bestPath = [...filteredPaths,
            // filteredEnd].sort((a, b) => {     return a.length - b.length })[0] || [];
            // this.setState({ paths: [bestPath]})
        }

    }

    resetPaths = (cell, row, paths) => {
        this.setState({paths: []});

        this.checkNeighbour(0, row, [],)

    }

    handleClick = (row, cell) => {
        const {grid, paths, start, graph} = this.state;
        const updateGrid = [...grid];
        const gridValue = updateGrid[row][cell];


        const invertValue = (gridValue === 'default')
            ? 'clear'
            : 'default';
        updateGrid[row][cell] = invertValue;


        const updateGraph = [...graph];
        const graphValue = updateGraph[row][cell];


        const invertValueGraph = (graphValue === 0)
            ? 1
            : 0;
        updateGraph[row][cell] = invertValueGraph;

    
        
        var shortestPath = bfs(graph, 1, 5); // [1, 2, 3, 5]

        console.log(bfs()(updateGraph, 1, 5))

        this.setState({ grid: updateGrid, graph: updateGraph})

    }

    createGrid = (rows, cells, start, end) => {
        return Array
            .from(Array(rows))
            .map((row, irow) => (Array.from(Array(cells)).map((cell, icell) => {
                if (icell === 0 && irow === start) {
                    return 'start';
                }
                if (icell === (rows - 1) && irow === end) {
                    return 'end';
                }
                return 'default';
            })));

    }

    createGraph = (rows, cells, start, end) => {
        return Array
            .from(Array(rows))
            .map((row, irow) => (Array.from(Array(cells)).map((cell, icell) => {
                if (icell === 0 && irow === start) {
                    return 1;
                }
                if (icell === (rows - 1) && irow === end) {
                    return 1;
                }
                return 0;
            })));

    }

    checkBestPath = (start, grid) => {}

    render() {
        const {grid, start, end, graph} = this.state;

        const bestPath = findShortestPath([
            start, 0
        ], [...grid.map(el => [...el])]);

        console.log(bestPath)

        const getType = (row, col, actVal, start, end) => {
            if (actVal) {
                if (row === start && col === 0) {
                    return 'start';
                }
                if (row === end && col === graph.length - 1) {
                    return 'end';
                }
                return 'clear';
            }
            return 'default';
        }
        return (
            <div>

                <GridWrapper>
                    {grid.map((row, irow) => (row.map((cell, icell) => <Cell
                        key={`cell${irow}_${icell}`}
                        type={(bestPath && bestPath.includes(`${irow}_${icell}`))
                        ? 'path'
                        : cell}
                        onClick={(cell === 'start' || cell === 'end')
                        ? null
                        : () => this.handleClick(irow, icell)}/>)))}
                </GridWrapper>

                <GridWrapper>
                    {graph.map((row, irow) => (row.map((cell, icell) => {
                        const type = getType(irow, icell, cell, start, end);
              
                        return (<Cell
                            key={`cell${irow}_${icell}`}
                            type={type}
                            onClick={(type === 'start' || type === 'end')
                            ? null
                            : () => this.handleClick(irow, icell)}/>)

                    })))}
                </GridWrapper>
            </div>

        );
    }
}
