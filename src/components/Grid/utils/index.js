
export const findShortestPath = (PathStartCoordinates, grid) => {
    const fromTop = PathStartCoordinates[0];
    const fromLeft = PathStartCoordinates[1];
    const newGrid = [...grid];

    const location = {
        fromTop,
        fromLeft,
        path: [],
        status: 'PathStart'
    };

    // Initialize the queue with the PathStart location already inside
    const queue = [location];

    while (queue.length > 0) {
        // Take the first location off the queue

        console.log(queue)
        const currentLocation = queue.shift();

        // Explore North
        let newLocation = exploreInDirection(currentLocation, 'North', newGrid);
        if (newLocation.status === 'PathEnd') {
            return newLocation.path;
        } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
        }

        // Explore East
        newLocation = exploreInDirection(currentLocation, 'East', newGrid);
        if (newLocation.status === 'PathEnd') {
            return newLocation.path;
        } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
        }

        // Explore South
        newLocation = exploreInDirection(currentLocation, 'South', newGrid);
        if (newLocation.status === 'PathEnd') {
            return newLocation.path;
        } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
        }

        // Explore West
        newLocation = exploreInDirection(currentLocation, 'West', newGrid);
        if (newLocation.status === 'PathEnd') {
            return newLocation.path;
        } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
        }
    }

    // No valid path found
    return false;

};


const locationStatus = (location, newGrid) => {
    const gridSize = newGrid.length;
    const dft = location.fromTop;
    const dfl = location.fromLeft;

    if (location.fromLeft < 0 ||
        location.fromLeft >= gridSize ||
        location.fromTop < 0 ||
        location.fromTop >= gridSize) {

        // location is not on the grid--return false
        return 'Invalid';
    } else if (newGrid[dft][dfl] === 'end') {
        return 'PathEnd';
    } else if (newGrid[dft][dfl] !== 'default') {
        // location is either an obstacle or has been visited
        return 'Blocked';
    } else {
        return 'Valid';
    }
};


// Explores the grid from the given location in the given
// direction
const exploreInDirection = (currentLocation, direction, newGrid) => {
    var newPath = currentLocation.path.slice();
    newPath.push(direction);

    var dft = currentLocation.fromTop;
    var dfl = currentLocation.fromLeft;

    if (direction === 'North') {
        dft -= 1;
    } else if (direction === 'East') {
        dfl += 1;
    } else if (direction === 'South') {
        dft += 1;
    } else if (direction === 'West') {
        dfl -= 1;
    }

    const newLocation = {
        fromTop: dft,
        fromLeft: dfl,
        path: newPath,
        status: 'Unknown'
    };
    newLocation.status = locationStatus(newLocation, newGrid);

    // If this new location is valid, mark it as 'Visited'
    
    if (newLocation.status === 'Valid') {
        newGrid[newLocation.fromTop][newLocation.fromLeft] = 'Visited';
    }

    return newLocation;
};

