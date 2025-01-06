module.exports = (input) => {
    const inpuExample =
        `7 6 4 2 1
    1 2 7 8 9
    9 7 6 2 1
    1 3 2 4 5
    8 6 4 4 1
    1 3 6 7 9`;

    const lines = input.split('\n');
    let totalSafeReports = 0;
    let totalSafeWithDamper = 0;

    lines.forEach((line) => {
        const levels = line.split(' ').map(Number);

        if (isSafe(levels)) {
            totalSafeReports++;
            totalSafeWithDamper++;
        } else if (isSafeWithDamper(levels)) {
            totalSafeWithDamper++;
        }
    });
    console.log('Save reports number for part 1 is: ', totalSafeReports);
    console.log('Save reports number for part 2 is: ', totalSafeWithDamper);

    function isSafe(levels) {
        let isIncreasing = true;
        let isDecreasing = true;

        for (let i = 1; i < levels.length; i++) {
            const difference = levels[i] - levels[i - 1];

            if (Math.abs(difference) < 1 || Math.abs(difference) > 3) {
                return false;
            }

            if ((difference < 0)) {
                isIncreasing = false;

            } else if (difference > 0) {
                isDecreasing = false;
            }
        }
        return isIncreasing || isDecreasing;
    };

    function isSafeWithDamper(levels) {
        for (let i = 0; i < levels.length; i++) {
            const changedLevels = levels.slice(0, i).concat(levels.slice(i + 1));

            if (isSafe(changedLevels)) {
                return true;
            }
        }
        return false;
    };
};