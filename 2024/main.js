const path = require('path');
const inputRequest = require('./inputRequest');


const CURRENT_DAY = 23;

console.log(CURRENT_DAY);
const folderName = `day${CURRENT_DAY}`;


(async () => {

    try {
        const input = await inputRequest(CURRENT_DAY);

        const filePath = path.join(__dirname, folderName, 'index.js');
        const dayLogic = require(filePath)
        console.log(`Execute code for day ${CURRENT_DAY}`);

        dayLogic(input);

    } catch (error) {
        console.log(`Error execute code for day ${CURRENT_DAY}:`, error.message);
    }
})();
