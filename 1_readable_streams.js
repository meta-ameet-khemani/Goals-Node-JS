const { Readable } = require('stream');

const data = [
    'This is the 1st line for testing readable streams',
    'This is the 2nd line for testing readable streams',
    'This is the 3rd line for testing readable streams',
    'This is the 4th line for testing readable streams',
    'This is the 5th line for testing readable streams',
];

class MyCustomReadableStream extends Readable {
    constructor(data) {
        // converting streamed data into string
        // super({ encoding: 'utf-8' });

        // converting streamed data into object
        super({ objectMode: true });
        this.array = data;
        this.index = 0;
    }

    _read() {
        if (this.index < this.array.length) {
            const chunk = {
                data: this.array[this.index],
                index: this.index,
            };
            this.push(chunk);
            this.index++;
        } else {
            this.push(null);
        }
    }
}

const myCustomReadableStream = new MyCustomReadableStream(data);

myCustomReadableStream.on('data', (chunk) => {
    console.log('Chunk: ', chunk);
});

myCustomReadableStream.on('end', () => {
    console.log('Stream ends');
});

myCustomReadableStream.on('error', console.error);

myCustomReadableStream.pause();

process.stdin.on('data', (chunk) => {
    if (chunk.toString().trim() === 'end')
        myCustomReadableStream.resume();
    myCustomReadableStream.read();
});

// myCustomReadableStream.read();
// myCustomReadableStream.read();
// myCustomReadableStream.read();
// myCustomReadableStream.read();
// myCustomReadableStream.read();
// myCustomReadableStream.read();
// myCustomReadableStream.read();
// myCustomReadableStream.read();