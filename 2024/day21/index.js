const keypads = {
    numeric: [
        ["7", "8", "9"],
        ["4", "5", "6"],
        ["1", "2", "3"],
        [null, "0", "A"]
    ],
    directional: [
        [null, "^", null],
        ["<", "v", ">"]
    ]
};

// Map of movements: [rowChange, colChange]
const movements = {
    "^": [-1, 0],
    "v": [1, 0],
    "<": [0, -1],
    ">": [0, 1]
};

// BFS to find shortest sequence
function findShortestSequence(start, target, keypad) {
    const rows = keypad.length;
    const cols = keypad[0].length;
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const queue = [[...start, ""]]; // [row, col, path]

    while (queue.length) {
        const [row, col, path] = queue.shift();

        if (keypad[row][col] === target) return path;
        if (visited[row][col]) continue;

        visited[row][col] = true;

        for (const [direction, [dr, dc]] of Object.entries(movements)) {
            const newRow = row + dr;
            const newCol = col + dc;

            if (
                newRow >= 0 &&
                newRow < rows &&
                newCol >= 0 &&
                newCol < cols &&
                keypad[newRow][newCol] !== null
            ) {
                queue.push([newRow, newCol, path + direction]);
            }
        }
    }

    throw new Error("Target not reachable");
}

// Calculate complexity for all codes
function calculateComplexities(inputString) {
    const codes = inputString.trim().split("\n"); // Parse codes from input string
    const start = [3, 2]; // Start at "A" on numeric keypad
    let totalComplexity = 0;

    for (const code of codes) {
        let currentPos = [...start];
        let totalLength = 0;

        for (const char of code) {
            const path = findShortestSequence(currentPos, char, keypads.numeric);
            totalLength += path.length + 1; // +1 for "A" to press the button
            currentPos = move(currentPos, path[path.length - 1]);
        }

        const numericValue = parseInt(code.slice(0, -1), 10);
        totalComplexity += totalLength * numericValue;
    }

    return totalComplexity;
}

// Move position helper
function move(position, direction) {
    const [row, col] = position;
    const [dr, dc] = movements[direction];
    return [row + dr, col + dc];
}

// Example input
const inputString = `
  029A
  980A
  179A
  456A
  379A
  `;

// Calculate and print the total complexity
console.log(calculateComplexities(inputString));
