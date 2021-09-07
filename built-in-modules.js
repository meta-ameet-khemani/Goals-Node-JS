// const os = require('os')

// const user = os.userInfo()
// console.log(user);

// console.log(`Uptime is seconds ${os.uptime()}`);

// const currentOs = {
//     name: os.type(),
//     release: os.release(),
//     totalMem: os.totalmem(),
//     freeMem: os.freemem(),
// }
// console.log(currentOs);

// const path = require('path')

// console.log(path.sep);

// console.log(path.resolve(__dirname, 'content', 'test.txt'));

const fs = require('fs');

fs.readFile('./content/test.txt', 'utf-8', (error, result) => {
    if (error)
        console.log(`Error: ${error}`);
    const first = result;
    fs.readFile('./content/test2.txt', 'utf-8', (error, result) => {
        if (error)
            console.log(`Error: ${error}`);
        const second = result;
        fs.writeFile('./content/test3.txt', `Data: ${first} \n ${second}`, {flag: 'a'}, (error, result) => {
            if (error)
                console.log(`Error in writing: ${error}`);
        })
    });
});