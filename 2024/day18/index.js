module.exports = (input) => {
    const gridSize = 71;  //7 for example
    const inputExample = `5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0
`;
    const maxFalls = 1024; //12 for example

    const directions = [
        [0, 1],  // Down
        [1, 0],  // Right
        [0, -1], // Up
        [-1, 0], // Left
    ];

    const findPath = (gridSize, input, maxFalls) => {
        const falls = input.split('\n').map(line => line.split(',').map(Number));

        // Initialize the grid
        const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill('.'));

        // Add falling bytes
        for (let i = 0; i < Math.min(falls.length, maxFalls); i++) {
            const [x, y] = falls[i];
            grid[y][x] = '#';

        }
        // Breadth-First Search (BFS) for shortest path
        const bfs = (start, end) => {
            const queue = [[...start, 0]];
            const visited = Array.from({ length: gridSize }, () => Array(gridSize).fill(false));
            visited[start[1]][start[0]] = true;

            while (queue.length > 0) {
                console.log('new queue', queue);
                const [x, y, steeps] = queue.shift();

                if (x === end[0] && y === end[1]) {
                    return steeps;
                }
                for (const [dx, dy] of directions) {
                    const nextx = x + dx;
                    const nexty = y + dy;

                    if (nextx >= 0 && nextx < gridSize && nexty >= 0 && nexty < gridSize && !visited[nextx][nexty] && grid[nextx][nexty] !== '#') {
                        visited[nextx][nexty] = true;
                        queue.push([nextx, nexty, steeps + 1]);
                    }
                }
            }
            return false;
        };

        // Part 1
        return bfs([0, 0], [gridSize - 1, gridSize - 1]);

        // Part 2
        for (let i = 0; i < falls.length; i++) {
            const [x, y] = falls[i];
            grid[y][x] = '#';

            const isPathAvailable = bfs([0, 0], [gridSize - 1, gridSize - 1]);
            if (!isPathAvailable) {
                return `${x},${y}`;

            }
        }
        return null;
    }

    const result = findPath(gridSize, input, maxFalls);
    console.log('Minimum number of steps: ', result);
}