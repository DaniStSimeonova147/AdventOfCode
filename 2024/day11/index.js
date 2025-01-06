module.exports = (input) => {

const inputExample =
    `125 17`;
const blinks = 75;

const stones = input.split(' ').map(Number);

const calculateStones = (stones) => {
    let stonesArr = [];

// Save stone number and stone count 
    for (const stone of stones) {
        const stoneExist = stonesArr.find(([num]) => num === stone);
        if (stoneExist) {
            stoneExist[1] += 1;
        } else {
            stonesArr.push([stone, 1]);
        }
    }

    for (let i = 0; i < blinks; i++) {
        const newStonesArr = [];

        // Apply the rules on every stone
        for (const [currentStone, count] of stonesArr) {
            if (currentStone === 0) {
                const currentStoneExist = newStonesArr.find(([num]) => num === 1);

                if (currentStoneExist) {
                    currentStoneExist[1] += count;
                } else {
                    newStonesArr.push([1, count]);
                }
            } else {
                let currentStoneStr = String(currentStone);
                
                if (currentStoneStr.length % 2 === 0) {

                    const half = currentStoneStr.length / 2;
                    const leftPart = Number(currentStoneStr.substring(0, half));
                    const rightPart = Number(currentStoneStr.substring(half));

                    const leftPartExist = newStonesArr.find(([num]) => num === leftPart);
                    if (leftPartExist) {
                        leftPartExist[1] += count;
                    } else {
                        newStonesArr.push([leftPart, count]);
                    }

                    const rightPartExist = newStonesArr.find(([num]) => num === rightPart);
                    if (rightPartExist) {
                        rightPartExist[1] += count;
                    } else {
                        newStonesArr.push([rightPart, count]);
                    }
                } else {
                    const newStone = currentStone * 2024;
                    const newStoneExist = newStonesArr.find(([num]) => num === newStone);

                    if (newStoneExist) {
                        newStoneExist[1] += count;
                    } else {
                        newStonesArr.push([newStone, count]);
                    }
                }
            }

        }
        stonesArr = newStonesArr;
    }
    let stonesCount = 0;
    for (const [, count] of stonesArr) {
        stonesCount += count;
    }
    return stonesCount;
};

const result = calculateStones(stones);
console.log('Final stones count is: ', result);
};


// Part 1
// const inputExample =
//     `125 17`;
    // const calculateStones = (stones) => {
    //     let stonesCount = 0;
    //     let queueStones = stones;
    //     for (let i = 0; i < blinks; i++) {
    //        
    //         let currentStonesLenght = queueStones.length;
    //         while (currentStonesLenght > 0) {
    //             let currentStone = queueStones.shift();
    //             if (currentStone === 0) {
    //                 currentStone = 1;
    //                 queueStones.push(currentStone);
    //             } else {
    //                 let currentStoneStr = String(currentStone);
    //                 if (currentStoneStr.length % 2 === 0) {
    //                     const half = currentStoneStr.length / 2;
    //                     queueStones.push(Number(currentStoneStr.substring(0, half)));
    //                     queueStones.push(Number(currentStoneStr.substring(half)));
    //                 } else {
    //                     currentStone = currentStone * 2024;
    //                     queueStones.push(currentStone);
    //                 }
    //             }
    //             currentStonesLenght--;
    //         }
    //     }
    //     stonesCount = queueStones.length;
    //     return stonesCount;
    // }