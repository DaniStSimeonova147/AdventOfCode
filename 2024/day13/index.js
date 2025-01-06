moduule.exports = (input) => {

    const inputExample = `
Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279
`.split("\n\n");

    // Calculate the minimum tokens reqired to win the prize for a given machine
    const calculateTokens = ([a1, a2, b1, b2, c1, c2]) => {
        // Linear system
        const A = (c1 * b2 - b1 * c2) / (a1 * b2 - b1 * a2);
        const B = (a1 * c2 - c1 * a2) / (a1 * b2 - b1 * a2);

        if (Number.isInteger(A) && Number.isInteger(B)) {
            return A * 3 + B;
        }
        return 0;
    };

    // Processes all claw machines and calculate total token
    const processClawMachines = (adjustMeasurements = false) => {
        let totalTokens = 0;

        for (let i = 0; i < input.length; i++) {
            const input = input[i];

            let matches = [...input.matchAll(/(\d+).+?(\d+)/g)];

            let machineParams = [];

            for (let i = 0; i < matches.length; i++)
                machineParams.push(parseInt(matches[i][1]), parseInt(matches[i][2]));

            if (adjustMeasurements) {
                machineParams.splice(4, 2, machineParams[4] + 1e13, machineParams[5] + 1e13);
            }

            console.log(machineParams);
            totalTokens += calculateTokens(machineParams);
        }

        return totalTokens;
    };

    console.log("Tokens:", processClawMachines());
    console.log("Tokens, with adjusted measurements:", processClawMachines(true));

};