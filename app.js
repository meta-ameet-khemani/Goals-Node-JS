console.log('first line');

setTimeout(() => {
    console.log('Inside timeout');
}, 500);

const interval = setInterval(() => {
    console.log('Inside interval');
}, 250);

console.log('second line');

for (let index = 0; index < 10000; index++) {
    console.log(index);
}

setTimeout(() => {
    console.log('Clearing interval');
    clearInterval(interval);
}, 1500);