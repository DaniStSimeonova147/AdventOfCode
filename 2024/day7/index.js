module.exports = (input) => {

    const inputExample =
        `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

    const calculateTotalCalibration = (input) => {
        const equations = input.split('\n');
        let totalCalibration = 0;

        for (const equation of equations) {
            const [testValueData, numbersData] = equation.split(': ');
            const testValue = Number(testValueData);
            const numbers = numbersData.split(' ').map(Number);

            // Check if we can solve the equation with the given operators
            if (canSolveEquation(numbers, testValue)) {
                totalCalibration += testValue;
            }
        }

        return totalCalibration;
    };

    // Generate all possible operator combinations (+, *, ||) iteratively
    const getOperatorCombinations = (length) => {
        const operators = ['+', '*', '||'];
        const combinations = [];

        const stack = [[]];

        while (stack.length > 0) {
            const current = stack.pop();
            if (current.length === length) {
                combinations.push(current);
            } else {
                for (const op of operators) {
                    stack.push([...current, op]);
                }
            }
        }
        return combinations;
    };

    // Check if an equation can be solved with a combination of operators
    const canSolveEquation = (numbers, testValue) => {
        const operatorCombinations = getOperatorCombinations(numbers.length - 1);

        for (const operators of operatorCombinations) {
            if (evaluateExpression(numbers, operators) === testValue) {
                return true;
            }
        }
        return false;
    };

    // Evaluate the expression left-to-right
    const evaluateExpression = (numbers, operators) => {
        let result = numbers[0];

        for (let i = 0; i < operators.length; i++) {
            const operator = operators[i];
            const nextNumber = numbers[i + 1];

            if (operator === '+') {
                result += nextNumber;
            } else if (operator === '*') {
                result *= nextNumber;
            }
            //Part 2
            else if (operator === '||') {
                result = Number(String(result) + String(nextNumber));
            }
        }
        return result;
    };

    const result = calculateTotalCalibration(input);
    console.log('Total calibration result: ', result);
}