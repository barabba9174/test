
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
                y: y - 1
            };
        case 'W':
            return {
                x: x - 1,
                y
            };
        case 'N':
        case 3:
            return {
                x,
                y: y + 1
            };
        default:
            return { x, y };
    }
};


export const cardinals = ['E', 'S', 'W', 'N'];


// Start location will be in the following format:
// [distanceFromTop, distanceFromLeft]



export const findShortestPath = (startCoordinates, grid) => {

    var distanceFromTop = startCoordinates[0];
    var distanceFromLeft = startCoordinates[1];

    // Each "location" will store its coordinates
    // and the shortest path required to arrive there
    var location = {
        distanceFromTop,
        distanceFromLeft,
        path: [],
        status: 'start'
    };

    // Initialize the queue with the start location already inside
    var queue = [location];

    // Loop through the grid searching for the end
    while (queue.length > 0) {
        // Take the first location off the queue
        var currentLocation = queue.shift();

        // Explore North
        var newLocation = exploreInDirection(currentLocation, 'N', grid);
        if (newLocation.status === 'end') {
            returnFunction(grid);
        } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
        }

        // Explore East
        var newLocation = exploreInDirection(currentLocation, 'E', grid);
        if (newLocation.status === 'end') {
            returnFunction(grid);
        } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
        }

        // Explore South
        var newLocation = exploreInDirection(currentLocation, 'S', grid);
        if (newLocation.status === 'end') {
            returnFunction(grid);
        } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
        }

        // Explore West
        var newLocation = exploreInDirection(currentLocation, 'W', grid);
        if (newLocation.status === 'end') {
            returnFunction(grid);
        } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
        }


    }


    // No valid path found
    return false;

};

const returnFunction = (grid) => {
    const bestPath = grid.map((row, ir) => row.map((cell, ic) => cell === 'path' ? `${ir}_${ic}` : null).filter(el => el)).reduce((acc, val) => {
        return acc.concat(val)
    }, []);

    return bestPath;
}


export const bfs = () => {
    const buildPath = (parents, targetNode) => {
        var result = [targetNode];
        while (parents[targetNode] !== null) {
            targetNode = parents[targetNode];
            result.push(targetNode);
        }
        return result.reverse();
    }
   
    return (graph, startNode, targetNode) => {
        var parents = [];
        var queue = [];
        var visited = [];
        var current;
        queue.push(startNode);
        console.error(startNode, graph)
        parents[startNode] = null;
        visited[startNode] = true;
        while (queue.length) {
            current = queue.shift();
            if (current === targetNode) {
                return buildPath(parents, targetNode);
            }
            for (var i = 0; i < graph.length; i += 1) {
                if (i !== current && graph[current][i] && !visited[i]) {
                    parents[i] = current;
                    visited[i] = true;
                    queue.push(i);
                }
            }
        }
        return null;
    };
}

// This function will check a location's status
// (a location is "valid" if it is on the grid, is not an "obstacle",
// and has not yet been visited by our algorithm)
// Returns "Valid", "Invalid", "Blocked", or "end"
const locationStatus = (location, grid) => {
    var gridSize = grid.length;
    var dft = location.distanceFromTop;
    var dfl = location.distanceFromLeft;

    if (location.distanceFromLeft < 0 ||
        location.distanceFromLeft >= gridSize ||
        location.distanceFromTop < 0 ||
        location.distanceFromTop >= gridSize) {

        // location is not on the grid--return false
        return 'Invalid';
    } else if (grid[dft][dfl] === 'end') {
        return 'end';
    } else if (grid[dft][dfl] !== 'clear') {
        // location is either an obstacle or has been visited
        return 'Blocked';
    } else {
        return 'Valid';
    }
};


// Explores the grid from the given location in the given
// direction
const exploreInDirection =  (currentLocation, direction, grid) => {
    var newPath = currentLocation.path.slice();
    const { distanceFromTop, distanceFromLeft } = currentLocation;
    newPath.push(direction);

    var dft = distanceFromTop;
    var dfl = distanceFromLeft;

    if (direction === 'N') {
        dft -= 1;
    } else if (direction === 'E') {
        dfl += 1;
    } else if (direction === 'S') {
        dft += 1;
    } else if (direction === 'W') {
        dfl -= 1;
    }

    var newLocation = {
        distanceFromTop: dft,
        distanceFromLeft: dfl,
        path: newPath,
        status: 'Unknown'
    };
    newLocation.status = locationStatus(newLocation, grid);

    // If this new location is valid, mark it as 'checked'
    if (newLocation.status === 'Valid') {
        grid[newLocation.distanceFromTop][newLocation.distanceFromLeft] = 'path';
    }

    return newLocation;
};

