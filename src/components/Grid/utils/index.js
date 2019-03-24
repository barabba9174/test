export const directions = ['N', 'E', 'S', 'W'];

export const getForwardCoordsFromQuadrant = (quadrant, x, y) => {
    switch (quadrant) {
        case 'E':
            return {
                x: x + 1,
                y
            };
        case 'S':
            return {
                x,
                y: y + 1
            };
        case 'W':
            return {
                x: x - 1,
                y
            };
        case 'N':
            return {
                x,
                y: y - 1
            };
        default:
            return { x: -1, y: -1 };
    }
};

const bestPathFinder = (paths) => {
    if (paths.length < 1) {
        return paths;
    }
    const bestPath = [...paths].sort((a, b) => a.length - b.length);
    return bestPath[0];
}


export const pathFinder = (grid, prevY, prevX, queue, paths) => {
    
    const actuaQueue = [...queue];
    
    if (actuaQueue.includes('end')) {
        paths.push(actuaQueue)
        return bestPathFinder([...paths, actuaQueue]);
    }

    directions.forEach((dir) => {
        const { x, y } = getForwardCoordsFromQuadrant(dir, prevX, prevY);

        if (grid[y] && grid[y][x]) {

            if (grid[y][x] === 'end') {

                const fixAdiacentStartEnd = grid[prevY][prevX] === 'start' ? [] : [`${prevY}_${prevX}`];

                return pathFinder(grid, y, x, [...queue, ...fixAdiacentStartEnd, `end`], paths)


            } else if (grid[y][x] === 'clear') {
                const value = (grid[y][x] === 'start') ? 'start' : `${y}_${x}`;
                if (!actuaQueue.includes(value)) {
                    const elementToAdd = value === 'start' ? [] : [value];
                    pathFinder(grid, y, x, [...queue, ...elementToAdd], paths)
                } else {
                    return actuaQueue;
                }
            }
            return actuaQueue;
        }
        return actuaQueue;

    })

    return bestPathFinder(paths);
}