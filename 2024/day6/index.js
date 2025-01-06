module.exports = (input) => {

    const inputExample = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

    const guardDirections = ['^', '>', '<', 'v'];
    const directionSteps = {
        '^': [-1, 0],
        '>': [0, 1],
        '<': [0, -1],
        'v': [1, 0],
    };

    // Find the guard's initial position and direction in the grid 
    const findGuard = (input) => {
        const grid = input.split('\n').map(line => line.split(''));
        let guardPosition = null;
        let guardDirection = '';

        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                if (guardDirections.includes(grid[row][col])) {
                    guardPosition = [row, col];
                    guardDirection = grid[row][col];
                    grid[row][col] = '.';
                }
            }
        }
        return { grid, guardPosition, guardDirection };
    };

    // Simulate guard's path in the grid 
    const simulatePath = (grid, guardPosition, guardDirection) => {
        const [startRow, startCol] = guardPosition;
        let row = startRow;
        let col = startCol;
        let direction = guardDirection;

        // For tracking positions
        const visited = {};
        const markVisited = (r, c, d) => {
            if (!visited[r]) visited[r] = {};
            if (!visited[r][c]) visited[r][c] = {};
            visited[r][c][d] = true;
        };
        const isVisited = (r, c, d) => visited[r]?.[c]?.[d];

        markVisited(row, col, direction);

        while (true) {
            const [stepRow, stepCol] = directionSteps[direction];
            const nextRow = row + stepRow;
            const nextCol = col + stepCol;

            if (nextRow < 0 || nextRow >= grid.length || nextCol < 0 || nextCol >= grid[0].length) {
                return false;
            }

            if (grid[nextRow][nextCol] === '#') {
                // Change direction on obstruction
                if (direction === '^') direction = '>';
                else if (direction === '>') direction = 'v';
                else if (direction === 'v') direction = '<';
                else if (direction === '<') direction = '^';
            } else {
                // Move forward
                row = nextRow;
                col = nextCol;

                if (isVisited(row, col, direction)) {
                    return true; // Found a loop
                }
                markVisited(row, col, direction);
            }
        }
    };

    // Positions where we can add # for simulate loop
    const findValidObstructionPositions = (input) => {
        const { grid, guardPosition, guardDirection } = findGuard(input);
        let validCount = 0;

        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                if ((row === guardPosition[0] && col === guardPosition[1]) || grid[row][col] === '#') {
                    continue;
                }
                // Clone the grid and add an obstruction
                const newGrid = grid.map(line => [...line]);
                newGrid[row][col] = '#';

                if (simulatePath(newGrid, guardPosition, guardDirection)) {
                    validCount++;
                }
            }
        }
        return validCount;
    };

    const result = findValidObstructionPositions(input);
    console.log('Valid positions: ', result);
};
