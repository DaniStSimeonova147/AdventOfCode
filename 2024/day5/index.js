module.exports = (input) => {

    const inputExample =
        `47|53
    97|13
    97|61
    97|47
    75|29
    61|13
    75|53
    29|13
    97|29
    53|29
    61|53
    97|53
    61|29
    47|13
    75|47
    97|75
    47|61
    75|61
    47|29
    75|13
    53|13

    75,47,61,53,29
    97,61,53,29,13
    75,29,13
    75,97,47,61,53
    61,13,29`;

    //Part 2
    //75,97,47,61,53 => 97,75,47,61,53
    //61,13,29 => 61,29,13
    //97,13,75,29,47 => 97,75,47,29,13

    const [rulesPart, updatesPart] = input.split(/\n\s*\n/);

    const rules = rulesPart.split('\n').map(rule => {
        const [leftNumber, rightNumber] = rule.split('|').map(Number);
        return [leftNumber, rightNumber];
    });

    const updates = updatesPart.split('\n').map(update => {
        return update.split(',').map(Number);
    });

    const isValidUpdate = (update) => {
        for (const [leftNumber, rightNumber] of rules) {
            if (update.includes(leftNumber) && update.includes(rightNumber)) {
                const leftIndex = update.indexOf(leftNumber);
                const rightIndex = update.indexOf(rightNumber);

                if (leftIndex > rightIndex) {
                    return false;
                }
            }
        }
        return true;
    }

    //Part 2
    const orderNumbers = (update) => {
        let ordered = [...update];
        let changed = true

        while (changed) {
            changed = false;
            for (const [leftNumber, rightNumber] of rules) {
                if (ordered.includes(leftNumber) && ordered.includes(rightNumber)) {
                    const leftIndex = ordered.indexOf(leftNumber);
                    const rightIndex = ordered.indexOf(rightNumber);

                    if (leftIndex > rightIndex) {
                        [ordered[leftIndex], ordered[rightIndex]] = [ordered[rightIndex], ordered[leftIndex]];
                        changed = true;

                    }
                }
            }
        }
        return ordered;
    }

    const getMiddleNumber = (update) => {
        const middleIndex = Math.floor(update.length / 2);
        return update[middleIndex];
    }

    let totalMuddleSum = 0;
    for (let i = 0; i < updates.length; i++) {
        let update = updates[i];

        //  Part 1
        // if (isValidUpdate(update)) {
        //     const middleNumber = getMiddleNumber(update);
        //     totalMuddleSum += middleNumber;
        // }
        // Part 2
        if (!isValidUpdate(update)) {
            update = orderNumbers(update);
            const middleNumber = getMiddleNumber(update);
            totalMuddleSum += middleNumber;
        }
    }
    console.log('Total sum of middle numbers: ', totalMuddleSum);
};
