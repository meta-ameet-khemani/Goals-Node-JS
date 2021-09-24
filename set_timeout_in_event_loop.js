// https://stackoverflow.com/questions/40880416/what-is-the-difference-between-event-loop-queue-and-job-queue
// https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/
// https://nodejs.dev/learn/the-nodejs-event-loop
// https://stackoverflow.com/questions/36870467/what-is-the-order-of-execution-in-javascript-promises
// https://medium.com/@Rahulx1/understanding-event-loop-call-stack-event-job-queue-in-javascript-63dcd2c71ecd
// https://heynode.com/tutorial/how-event-loop-works-nodejs/
// https://www.voidcanvas.com/setimmediate-vs-nexttick-vs-settimeout/
// https://www.educative.io/edpresso/setimmediate-vs-processnexttick-in-nodejs?aid=5082902844932096&utm_source=google&utm_medium=cpc&utm_campaign=edpresso-dynamic&utm_term=&utm_campaign=Dynamic+-+Edpresso&utm_source=adwords&utm_medium=ppc&hsa_acc=5451446008&hsa_cam=8092184362&hsa_grp=86276435689&hsa_ad=397226000870&hsa_src=g&hsa_tgt=dsa-837376625453&hsa_kw=&hsa_mt=b&hsa_net=adwords&hsa_ver=3&gclid=EAIaIQobChMI_MrO1tiX8wIV4J1LBR3cuQ6AEAAYASAAEgItf_D_BwE

// // console.log('hi');
// setTimeout(() => {
//     console.log('first timeout');
// }, 1000);
// setTimeout(() => {
//     console.log('second timeout');
// }, 1000);
// setTimeout(() => {
//     console.log('third timeout');
// }, 1000);
// setTimeout(() => {
//     console.log('fourth timeout');
// }, 1000);
// setTimeout(() => {
//     console.log('fifth timeout');
// }, 1000);
// // console.log('end');

// const bar = () => console.log('bar');

// const baz = (index) => console.log('baz ', index);

// const foo = () => {
//   console.log('foo');
//   setTimeout(bar, 0);
//   new Promise((resolve, reject) =>
//     resolve('should be right after baz, before bar')
//   ).then((resolve) => console.log(resolve));
//   baz(1);
//   baz(2);
//   baz(3);
//   new Promise((resolve, reject) =>
//     resolve('2 should be right after baz, before bar')
//   ).then((resolve) => console.log(resolve));
//   baz(4);
//   baz(5);
//   baz(6);
// };

// foo();
// console.log('after foo');
// for (var i = 1; i < 100000; i++) console.log(i);
// baz(7);
// baz(8);
// baz(9);


// var promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('promise win')
//     }, 4000)
// })
// promise.then((result) => {
//     console.log(result)
// })
// setTimeout(() => {
//     console.log('setTimeout win')
// }, 4000)

// All `thenable` callbacks of the promise are called first, then the setTimeout callback is called.

// Job Queue has high priority in executing callbacks, if event loop tick comes to Job Queue, it will execute 
// all the jobs in job queue first until it gets empty, then will move to callback queue.

// both the setTimeout and promise are executed asynchronously and both take same amount of time but promises 
// are executed first then callback , this is because promise are move to job queue and setTimeout is moved to 
// callBack queue from the Web Api which is basically create during javascript runtime to perform tasks 
// asynchronously and so Job Queue has priority over the task queue

// every browser, open different loops for every tab
// call stack :    synchronous code
// message/poll queue : setTimeout()/ browser features : asynchronous calls
// job queue :     promises/async await code : only for promises

// Job Queue has high priority in executing callbacks, if event loop tick comes to Job Queue, it will execute 
// all the jobs in job queue first until it gets empty, then will move to callback queue.

// console.log('script start');

// setTimeout(function () {
//   console.log('setTimeout');
// }, 0);

// Promise.resolve()
//   .then(function () {
//     console.log('promise1');
//   })
//   .then(function () {
//     console.log('promise2');
//   });

// console.log('script end');

// All `thenable` callbacks of the promise are called first, then the setTimeout callback is called.

// taks:       run script : setTimeout callback : 
// microtasks: promise then : 
// JS stack:   script : 

// after tasks, we run microtasks

// taks:        
// microtasks: promise then : 
// JS stack:   promise callback

// taks:       setTimeout callback        
// microtasks: 
// JS stack:   setTimeout callback



// TIMERS PHASE

// const fs = require('fs');

// function someAsyncOperation(callback) {
//   // Assume this takes 95ms to complete
//   fs.readFile('/path/to/file', callback);
// }

// console.log('setting current time');
// const timeoutScheduled = Date.now();

// setTimeout(() => {
//   const delay = Date.now() - timeoutScheduled;

//   console.log(`${delay}ms have passed since I was scheduled`);
// }, 100);

// // do someAsyncOperation which takes 95 ms to complete
// someAsyncOperation(() => {
//   const startCallback = Date.now();

//   // do something that will take 10ms...
//   while (Date.now() - startCallback < 10) {
//     // do nothing
//   }
// });


// timeout_vs_immediate.js
// setTimeout(() => {
//   console.log('timeout');
// }, 0);

// setImmediate(() => {
//   console.log('immediate');
// });

// timeout_vs_immediate.js
// const fs = require('fs');

// fs.readFile('__filename', () => {
//   setTimeout(() => {
//     console.log('timeout');
//   }, 0);
//   setImmediate(() => {
//     console.log('immediate');
//   });
// });

// The main advantage to using setImmediate() over setTimeout() is setImmediate() will always be executed before 
// any timers if scheduled within an I/O cycle, independently of how many timers are present

// let racer = function() {
//   setTimeout(() => console.log("timeout"), 0);
//   setImmediate(() => console.log("immediate"));
//   process.nextTick(() => console.log("nextTick"));
//   console.log("current event loop");
// }

// racer()


let racer1 = function() {
  setTimeout(() => console.log("timeout"), 0);
  setImmediate(() => console.log("immediate"));
  process.nextTick(() => console.log("nextTick"));
}

let racer2 = function() {
  process.nextTick(() => console.log("nextTick"));
  setTimeout(() => console.log("timeout"), 0);
  setImmediate(() => console.log("immediate"));
}

let racer3 = function() {
  setImmediate(() => console.log("immediate"));
  process.nextTick(() => console.log("nextTick"));
  setTimeout(() => console.log("timeout"), 0);
}

racer1()
racer2()
racer3()