module.exports = (input) => {

    const inputExample =
        `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

    const directions = [
        [-1, 0], //up
        [1, 0], //down
        [0, -1], //left
        [0, 1], //right
    ];

    const findTrailheadScore = (input) => {
        const grid = input.split('\n').map(row => row.split('').map(Number));

        let totalScore = 0;
        let totalRating = 0;
        const trailheads = [];

        //Find trailheads with position height 0
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                if (grid[row][col] === 0) {
                    trailheads.push([row, col]);
                }
            }
        }

        //Part 1
        //Calculate the score for a given trailhead
        //Breadth-First Search (BFS) Algorithm
        const calculateScore = (trailhead) => {

            const queue = [trailhead];
            const visitedPositions = [];
            const colectedNineNumbers = [];

            while (queue.length > 0) {

                const [currentRow, currentCol] = queue.shift();
                const startPosition = `${currentRow},${currentCol}`;
                if (visitedPositions.includes(startPosition)) {
                    continue;
                }
                visitedPositions.push(startPosition);
                for (const [directionRow, directionCol] of directions) {
                    const nextRow = currentRow + directionRow;
                    const nextCol = currentCol + directionCol;

                    if (nextRow >= 0 && nextRow < grid.length && nextCol >= 0 && nextCol < grid[0].length) {
                        const currentNumber = grid[currentRow][currentCol];
                        const nextNumber = grid[nextRow][nextCol];

                        if (nextNumber === currentNumber + 1) {
                            if (nextNumber === 9) {

                                const colectedNineNumber = `${nextRow}, ${nextCol}`;
                                if (!colectedNineNumbers.includes(colectedNineNumber)) {
                                    colectedNineNumbers.push(colectedNineNumber);
                                }
                            } else {
                                queue.push([nextRow, nextCol]);
                            }
                        }

                    }
                }
            }
            return colectedNineNumbers.length;
        };

        //Part 2
        //Calculate the raiting for a given trailhead
        const calculateRating = (trailhead) => {
            const [startRow, startCol] = trailhead;
            let distinctTrailheads = 0;

            const findDistinctTrailheads = (currentRow, currentCol, visited) => {
                const startPosition = `${currentRow},${currentCol}`;
                if (visited.includes(startPosition)) {
                    return;
                }
                for (const [directionRow, directionCol] of directions) {
                    const nextRow = currentRow + directionRow;
                    const nextCol = currentCol + directionCol;

                    if (nextRow >= 0 && nextRow < grid.length && nextCol >= 0 && nextCol < grid[0].length) {
                        const currentNumber = grid[currentRow][currentCol];
                        const nextNumber = grid[nextRow][nextCol];

                        if (nextNumber === currentNumber + 1) {
                            if (nextNumber === 9) {
                                distinctTrailheads++;
                            } else {
                                findDistinctTrailheads(nextRow, nextCol, [...visited]);
                            }

                        }
                    }
                }
            };

            findDistinctTrailheads(startRow, startCol, []);
            return distinctTrailheads;
        };

        for (const trailhead of trailheads) {
            totalScore += calculateScore(trailhead);
            totalRating += calculateRating(trailhead);
        }
        return {
            totalScore,
            totalRating
        };
    };

    const result = findTrailheadScore(input);
    console.log('Total score: ', result.totalScore);
    console.log('Total rating: ', result.totalRating);
};
