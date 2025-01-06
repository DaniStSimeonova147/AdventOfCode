moduule.exports = (input) => {

    const inputExample =
        `AAAA
BBCD
BBCC
EEEC`;

    const calculateFencingPrice = (input) => {
        const garden = input.trim().split('\n').map(line => line.split(''));

        const gardenRows = garden.length;
        const gardenCols = garden[0].length;
        const visited = Array.from({ length: gardenRows }, () => Array(gardenCols).fill(false));

        const directions = [
            { dr: -1, dc: 0 },
            { dr: 1, dc: 0 },
            { dr: 0, dc: -1 },
            { dr: 0, dc: 1 },
        ];

        // function to calculate area and perimeter for a specific plant type
        const gardenFloodFill = (row, col, plantType) => {
            let area = 0;
            let perimeter = 0;
            let sides = 0;
            //BFS (Breadth-First Search)
            const queueGarden = [{ row, col }];
            visited[row][col] = true;

            while (queueGarden.length > 0) {
                const { row: currentRow, col: currentCol } = queueGarden.shift();
                console.log(visited);
                area++;
                for (const { dr, dc } of directions) {
                    const newRow = currentRow + dr;
                    const newCol = currentCol + dc;

                    if (newRow < 0 || newRow >= gardenRows || newCol < 0 || newCol >= gardenCols || garden[newRow][newCol] !== plantType) {
                        perimeter++;
                    } else if (!visited[newRow][newCol]) {
                        visited[newRow][newCol] = true;
                        sides++;
                        queueGarden.push({ row: newRow, col: newCol });
                    }

                }
            };

            return { area, perimeter, sides };
        };

        let totalFencingPriceByPerimeter = 0;
        let totalFencingPriceBySides = 0;

        // Iterate through each cell in the garden
        for (let row = 0; row < gardenRows; row++) {
            for (let col = 0; col < gardenCols; col++) {
                if (!visited[row][col]) {
                    const plantType = garden[row][col];
                    const { area, perimeter, sides } = gardenFloodFill(row, col, plantType);
                    totalFencingPriceByPerimeter += area * perimeter;
                    totalFencingPriceBySides += area * sides;
                }
            }
        }
        return { totalFencingPriceByPerimeter, totalFencingPriceBySides };
    };

    const result = calculateFencingPrice(input);
    console.log('Total fencing price by perimeter is: ', result.totalFencingPriceByPerimeter);
    console.log('Total fencing price by sides is: ', result.totalFencingPriceBySides);
};