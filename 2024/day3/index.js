module.exports = (input) => {
    const inputExample = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
    const inputExamplePart2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

    const regexData = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g;
    const regexNumbers = /\d{1,3}/g;

    const matchData = input.match(regexData);

    let totalSum = 0;
    let isEnabled = true;

    for (const currentData of matchData) {
        if (currentData === 'do()') {
            isEnabled = true;
        } else if (currentData === "don't()") {
            isEnabled = false;
        } else if (currentData.startsWith('mul(') && isEnabled) {
            const numbers = currentData.match(regexNumbers);
            const numberX = numbers[0];
            const numberY = numbers[1]
            totalSum += numberX * numberY;
        }
    }

    console.log('Total sum: ', totalSum);
};
