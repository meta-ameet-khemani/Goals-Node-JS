// const fs = require('fs');
// fs.readFile/fs.writeFile
// import { readFile, writeFile } from 'fs';

// first blocking approach
// =======================================

// readFile('./content/first.txt', 'utf-8', (error, data) => {
//     if (error) {
//         console.log('Error in reading from file 1');
//         console.log(error);
//         return;
//     }
//     const first = data;
//     readFile('./content/second.txt', 'utf-8', (error, data) => {
//         if (error) {
//             console.log('Error in reading from file 2');
//             console.log(error);
//             return;
//         }
//         const second = data;
//         writeFile('./content/third.txt', `This is final file: \n ${first} ${second}`, { flag: 'a' }, (error, data) => {
//             if (error) {
//                 console.log('Error in writing to file');
//                 console.log(error);
//             }
//         });
//     }); 
// });


// 2nd Approach
// using promises
// ============================

// const { readFile, writeFile } = require('fs');

// const getText = (path) => {
//     return new Promise((resolve, reject) => {
//         readFile(path, 'utf-8', (error, data) => {
//             if (error)
//                 reject(error)
//             else
//                 resolve(data)
//         });
//     });
// };

// getText('./content/first.txt').then(res => console.log(res)).catch(err => console.log(err));

// 3rd approach
// ==================================

// using this, we did some shortening in code but still we are blocking the code as we will have to nest this
// or we can say we first have to get the content of 2 files and then append in the third one

// so better solution will be to use async/await code, which not only will be more readable but also much
// better solution in such case

// const { readFile, writeFile } = require('fs');

// const getText = (path) => {
//     return new Promise((resolve, reject) => {
//         readFile(path, 'utf-8', (error, data) => {
//             if (error)
//                 reject(error)
//             else
//                 resolve(data)
//         });
//     });
// };

// const start = async () => {
//     try {
//         const first = await getText('./content/first.txt');
//         const second = await getText('./content/second.txt');
//         console.log(first);
//         console.log(second);
//     } catch (error) {
//         console.log(error);
//     }
// }

// start();


// As we have converted the readFile into promise using async and await, we can get this functionality inbuilt
// as using promisify like

// const { readFile, writeFile, read } = require('fs');
// const util = require('util');
// const readFilePromise = util.promisify(readFile);
// const writeFilePromise = util.promisify(writeFile);

// const start = async () => {
//     try {
//         const first = await readFilePromise('./content/first.txt', 'utf-8');
//         const second = await readFilePromise('./content/second.txt', 'utf-8');
//         console.log(first, '\n', second);
//     } catch (error) {
//         console.log(error);
//     }
// }

// start();

// ==================== OR ==========================

const { readFile, writeFile } = require('fs').promises;

const start = async () => {
    try {
        const first = await readFile('./content/first.txt', 'utf-8');
        const second = await readFile('./content/second.txt', 'utf-8');
        console.log(first, '\n', second);
        await writeFile('./content/fourth.txt', `New text ${first} ${second}`);
    } catch (error) {
        console.log(error);
    }
}

start();