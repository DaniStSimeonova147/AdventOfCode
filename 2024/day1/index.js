module.exports = (input) => {

    const exampleInput =
        `3   4
        4   3
        2   5
        1   3
        3   9
        3   3`;

    const lines = input.split('\n')

    const leftNumbers = [];
    const rightNumbers = [];

    lines.forEach((line) => {
        const [leftNumber, rightNumber] = line.split('   ').map(Number);
        leftNumbers.push(leftNumber);
        rightNumbers.push(rightNumber);
    });

    leftNumbers.sort((a, b) => a - b);
    rightNumbers.sort((a, b) => a - b);

    let totalDistansPart1 = 0;

    for (let i = 0; i < leftNumbers.length; i++) {
        totalDistansPart1 += Math.abs(leftNumbers[i] - rightNumbers[i]);
    }
    console.log('Total distanse part1: ', totalDistansPart1);

    let totalDistansPart2 = 0;

    let numbersCounter = 0
    for (const leftNumber of leftNumbers) {

        numbersCounter = rightNumbers.filter(x => x === leftNumber).length;
        totalDistansPart2 += leftNumber * numbersCounter;
    }
    console.log('Total distanse part2: ', totalDistansPart2);

};