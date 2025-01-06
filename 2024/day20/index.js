const input = `###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`;

const directions = [
    [-1, 0], // up
    [1, 0], // down
    [0, -1], // left
    [0, 1], // right
];

const grid = input.split('\n').map(row => row.split(''));
let start, end;
grid.forEach((row, i) => {
    row.forEach((cell, j) => {
        if (cell === 'S') start = [i, j];
        if (cell === 'E') end = [i, j];
    });
});
const bfs = (grid, start, end) => {
    const [rows, cols] = [grid.length, grid[0].length];
    const queue = [[...start, 0, false]];

    const visited = Array.from({ length: rows }, () => Array.from({ length: cols }, () => [false, false]));
    visited[start[0]][start[1]][0] = true;

    while (queue.length) {
        const [x, y, steps, usedCheat] = queue.shift();
        if (x === end[0] && y === end[1]) {
            return steps;
        }
        for (const [dx, dy] of directions) {
            const [nextx, nexty] = [x + dx, y + dy];
            const isWall = nextx >= 0 && nextx < rows && nexty >= 0 && nexty < cols && grid[nextx][nexty] === '#';

            if (nextx >= 0 && nextx < rows && nexty >= 0 && nexty < cols) {
                const cheatIndex = usedCheat ? 1 : 0;
                if (!isWall && !visited[nextx][nexty][cheatIndex]) {
                    visited[nextx][nexty][cheatIndex] = true;
                    queue.push([nextx, nexty, steps + 1, usedCheat]);
                } else if (isWall && !usedCheat && !visited[nextx][nexty][1]) {
                    visited[nextx][nexty][1] = true;
                    queue.push([nextx, nexty, steps + 1, true]);
                }
            }
        }
    };
    return -1;
};

const standardTime = bfs(grid, start, end);
console.log('Standard time: ', standardTime);

