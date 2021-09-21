const EventEmitter = require('events');

const myEvents = new EventEmitter();

// myEvents.on('myEvent', ()=>{
//     console.log('My Event listened');
// });

myEvents.on('myEvent2', ()=>{
    console.log('My Event2 listened');
});

// we can use addListener instead on on() also

myEvents.addListener('myEvent', ()=>{
    console.log('My Event listened');
});

// can set as many listeners as we want

// myEvents.on('myEvent', (val)=>{
//     console.log('My Event listened -> ' + val);
// });

// myEvents.on('myEvent', ()=>{
//     console.log('My Event listened');
// });

// if we want only one listener then we should use

// myEvents.once('myEvent', () => {
//     console.log('Only one listener');
// })

// normally event emitter works synchronously
// if we need to set asynchornous calling

// myEvents.on('myEvent', (val)=>{
//     setImmediate(()=>{
//         console.log('My Event asynchronised listened -> ' + val);
//     });
// });

// myEvents.on('myEvent', ()=>{
//     process.nextTick(()=>{
//         console.log('My Event asynchronised 2 listened');
//     });
// });

// we should always use error event emitter to handle any error in events like this

myEvents.on('error', ()=>{
    console.log('Error on myEvent event');
});

// lists down all events on particute object

console.log(myEvents.eventNames());

// shows how many max listeners we can have on particular object

console.log(myEvents.getMaxListeners());

console.log(myEvents.listenerCount('myEvent'));

console.log(myEvents.getMaxListeners('myEvent'));

myEvents.emit('myEvent', 12);
myEvents.emit('myEvent2', 12);
console.log('ends');

// this will work only if once() is not used with this event 
// myEvents.emit('myEvent', 12);
// myEvents.emit('myEvent', 12);
