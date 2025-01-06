module.exports = (input) => {
    const inputExample = `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`;

    function runProgram(input, registers) {
        const program = input.split(",").map(Number);
        let instructionPointer = 0;
        const output = [];

        function getComboValue(operand) {
            if (operand >= 0 && operand <= 3) return operand;
            if (operand === 4) return registers.A; // Combo 4 
            if (operand === 5) return registers.B; // Combo 5 
            if (operand === 6) return registers.C; // Combo 6 
            throw new Error("Invalid combo operand");
        }

        while (instructionPointer < program.length) {
            const opcode = program[instructionPointer];
            const operand = program[instructionPointer + 1];

            switch (opcode) {
                case 0: // adv 
                    registers.A = Math.floor(registers.A / Math.pow(2, getComboValue(operand)));
                    break;

                case 1: // bxl 
                    registers.B = registers.B ^ operand;
                    break;

                case 2: // bst - B = operand % 8
                    registers.B = getComboValue(operand) % 8;
                    break;

                case 3: // jnz 
                    if (registers.A !== 0) {
                        instructionPointer = operand;
                        continue;
                    }
                    break;

                case 4: // bxc 
                    registers.B = registers.B ^ registers.C;
                    break;

                case 5: // out 
                    output.push(getComboValue(operand) % 8);
                    break;

                case 6: // bdv 
                    registers.B = Math.floor(registers.A / Math.pow(2, getComboValue(operand)));
                    break;

                case 7: // cdv 
                    registers.C = Math.floor(registers.A / Math.pow(2, getComboValue(operand)));
                    break;

                default:
                    throw new Error(`Invalid opcode: ${opcode}`);
            }

            instructionPointer += 2;
        }

        return output.join(",");
    }

    const registerA = parseInt(input.match(/Register A: (\d+)/)[1], 10);
    const registerB = parseInt(input.match(/Register B: (\d+)/)[1], 10);
    const registerC = parseInt(input.match(/Register C: (\d+)/)[1], 10);
    const program = input.match(/Program: (.+)/)[1];

    const registers = { A: registerA, B: registerB, C: registerC };

    const result = runProgram(program, registers);
    console.log("Output:", result);
};