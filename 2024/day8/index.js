moduule.exports = (input) => {

    const inputExample = `
............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............
`;
    const parseInput = (input) => {
        const grid = input.trim().split('\n').map(line => line.split(''));
        const frequencies = {};
        // Groups antenna locations by their frequency character
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                const char = grid[row][col];
                if (char === '.') continue;

                if (!frequencies[char]) {
                    frequencies[char] = [];
                }
                frequencies[char].push({ row, col });
            }
        }

        return { grid, frequencies };
    };

    const createVector = (start, end) => ({
        deltaRow: end.row - start.row,
        deltaCol: end.col - start.col,
    });

    const applyVector = (start, vector) => ({
        row: start.row + vector.deltaRow,
        col: start.col + vector.deltaCol,
    });

    const findAntinodes = (grid, frequencies) => {
        const uniqueAntinodes = {};

        for (const points of Object.values(frequencies)) {
            console.log(points);

            for (let i = 0; i < points.length; i++) {
                const pointA = points[i];

                for (let j = i + 1; j < points.length; j++) {
                    const pointB = points[j];
                    const addAntinodes = (base, reflection) => {
                        console.log(base);
                        console.log(reflection);
                        const vector = createVector(reflection, base);
                        console.log('vector', vector);

                        const antinode = applyVector(base, vector);

                        if (
                            antinode.row >= 0 &&
                            antinode.row < grid.length &&
                            antinode.col >= 0 &&
                            antinode.col < grid[0].length
                        ) {
                            const key = `${antinode.row},${antinode.col}`;
                            uniqueAntinodes[key] = true;
                        }
                    };

                    // Compute antinodes in both directions
                    addAntinodes(pointA, pointB);
                    addAntinodes(pointB, pointA);
                }
            }
        }

        return Object.keys(uniqueAntinodes).length;
    };

    const solution = (input) => {
        const { grid, frequencies } = parseInput(input);
        return findAntinodes(grid, frequencies);
    };


    console.log("Unique antinode count:", solution(input));

}
