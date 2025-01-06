module.exports = (input) => {
    const inputExample =
        `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

    const currentData = input.split('\n');

    const word = 'XMAS';

    const directions = [
        [0, 1], //right
        [0, -1], //left
        [1, 0], //down
        [-1, 0], //up
        [1, 1], //down-right
        [1, -1], //down-left
        [-1, 1], //up-right
        [-1, -1], //up-left
    ];

    let wordXMASCout = 0;

    const checkWord = (row, col, directionX, directionY) => {

        for (let i = 0; i < word.length; i++) {
            const newRow = row + i * directionX;
            const newCol = col + i * directionY;

            if (newRow < 0 || newRow >= currentData.length ||
                newCol < 0 || newCol >= currentData[row].length ||
                currentData[newRow][newCol] !== word[i]
            ) {
                return false;
            }

        }
        return true;
    };


    for (let row = 0; row < currentData.length; row++) {
        for (let col = 0; col < currentData[row].length; col++) {
            for (const [directionX, directionY] of directions) {
                if (checkWord(row, col, directionX, directionY)) {
                    wordXMASCout++;
                }
            }
        }
    }

    console.log('Total XMAS are: ', wordXMASCout);

    // Part 2

    // M.S
    // .A.
    // M.S
    const check1 = (currentData, row, col) => {
        if (row < 0 || row > currentData.length - 3 || col < 0 || col > currentData[row] - 3) {
            return false;
        }
        return currentData[row][col] === 'M' &&
            currentData[row][col + 2] === 'S' &&
            currentData[row + 1][col + 1] === 'A' &&
            currentData[row + 2][col] === 'M' &&
            currentData[row + 2][col + 2] == 'S'
    }

    // M.M
    // .A.
    // S.S
    const check2 = (currentData, row, col) => {
        if (row < 0 || row > currentData.length - 3 || col < 0 || col > currentData[row] - 3) {
            return false;
        }
        return currentData[row][col] === 'M' &&
            currentData[row][col + 2] === 'M' &&
            currentData[row + 1][col + 1] === 'A' &&
            currentData[row + 2][col] === 'S' &&
            currentData[row + 2][col + 2] == 'S'
    }

    // S.M
    // .A.
    // S.M
    const check3 = (currentData, row, col) => {
        if (row < 0 || row > currentData.length - 3 || col < 0 || col > currentData[row] - 3) {
            return false;
        }
        return currentData[row][col] === 'S' &&
            currentData[row][col + 2] === 'M' &&
            currentData[row + 1][col + 1] === 'A' &&
            currentData[row + 2][col] === 'S' &&
            currentData[row + 2][col + 2] == 'M'
    }

    // S.S
    // .A.
    // M.M
    const check4 = (currentData, row, col) => {
        if (row < 0 || row > currentData.length - 3 || col < 0 || col > currentData[row] - 3) {
            return false;
        }
        return currentData[row][col] === 'S' &&
            currentData[row][col + 2] === 'S' &&
            currentData[row + 1][col + 1] === 'A' &&
            currentData[row + 2][col] === 'M' &&
            currentData[row + 2][col + 2] == 'M'
    }

    let wordCout = 0;
    const allDirectionCount = (currentData, row, col) => {
        if (check1(currentData, row, col)) {
            wordCout++;
        }
        if (check2(currentData, row, col)) {
            wordCout++;
        }
        if (check3(currentData, row, col)) {
            wordCout++;
        }
        if (check4(currentData, row, col)) {
            wordCout++;
        }
        return wordCout;
    }

    for (let row = 0; row < currentData.length; row++) {
        for (let col = 0; col < currentData[row].length; col++) {
            allDirectionCount(currentData, row, col);
        }
    }

    console.log('Word X-MAS count: ', wordCout);

};
