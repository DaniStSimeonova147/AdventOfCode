module.exports = (input) => {

    //const inputExample = '2333133121414133402';

    const discMap = (input) => {
        const blocks = [];
        let fileId = 0;

        for (let i = 0; i < input.length; i++) {
            const currentLength = Number(input[i]);

            if (i % 2 === 0) {
                for (let j = 0; j < currentLength; j++) {
                    blocks.push(fileId);
                }
                fileId++;
            } else {
                for (let j = 0; j < currentLength; j++) {
                    blocks.push('.');
                }
            }

        }
        return blocks;
    };
    const moveFileBlocks = (blocks) => {
        let newBlocks = [...blocks]

        for (let i = 0; i < newBlocks.length; i++) {
            for (let j = newBlocks.length - 1; j >= 0; j--) {

                if (newBlocks[i] === '.' && newBlocks[j] !== '.' && i < j) {
                    newBlocks[i] = Number(newBlocks[j]);
                    newBlocks[j] = '.';
                }
            }
        }
        return newBlocks;
    };

    //Part 2
    const moveFileByBlocks = (blocks) => {
        let newBlocks = [...blocks];

        // Extract files and free spaces
        let files = [];
        let freeSpaces = [];
        let i = 0;

        // Parse the blocks to identify files and free spaces
        while (i < newBlocks.length) {
            if (newBlocks[i] !== '.') {
                let fileId = newBlocks[i];
                let fileLength = 1;
                i++;
                while (i < newBlocks.length && newBlocks[i] === fileId) {
                    fileLength++;
                    i++;
                }
                files.push({ fileId, fileLength, start: i - fileLength, end: i - 1 });
            } else {
                let freeStart = i;
                while (i < newBlocks.length && newBlocks[i] === '.') {
                    i++;
                }
                let freeLength = i - freeStart;
                if (freeLength > 0) {
                    freeSpaces.push({ start: freeStart, length: freeLength });
                }
            }
        }
        // Sort files by ID in descending order
        files.sort((a, b) => b.fileId - a.fileId);

        for (let file of files) {

            const { fileId, fileLength } = file;

            // Find the first available free space that can accommodate this file
            let spaceToMove = freeSpaces.find(space => space.length >= fileLength);

            if (spaceToMove && spaceToMove.start < file.start) {
                for (let i = file.start; i <= file.end; i++) {
                    newBlocks[i] = '.';
                }
                for (let i = spaceToMove.start; i < spaceToMove.start + fileLength; i++) {
                    newBlocks[i] = fileId;
                }

                // Update free spaces after the file is moved
                freeSpaces = freeSpaces.filter(space => space !== spaceToMove);
                if (spaceToMove.length > fileLength) {
                    freeSpaces.push({ start: spaceToMove.start + fileLength, length: spaceToMove.length - fileLength });
                    freeSpaces.sort((a, b) => a.start - b.start);
                }
            }
        }
        return newBlocks;
    };

    const calculateCheckSum = (newBlocks) => {
        let checkSum = 0;
        for (let i = 0; i < newBlocks.length; i++) {
            if (newBlocks[i] !== '.') {
                checkSum += i * Number(newBlocks[i]);
            }
        }
        return checkSum;
    };

    const blocks = discMap(input);
    const newBlocks = moveFileBlocks(blocks);
    const newByBlocks = moveFileByBlocks(blocks);
    const checkSum = calculateCheckSum(newBlocks);
    const checkSumByBlocks = calculateCheckSum(newByBlocks);

    console.log('Check sum: ', checkSum);
    console.log('Check sum by blocks: ', checkSumByBlocks);
};