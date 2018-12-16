const { forAwaitEach, $$asyncIterator } = require('iterall');

const create0 = () => {
    return {
        [$$asyncIterator]() {
            return this
        },
        next() {
            return new Promise(resolve => {

                setTimeout(() => {
                    resolve({ done: false, value: 'timer ' + new Date() })
                }, 1000);

            })
        },
        return() {
            return {done: true}
        },
    }
}

function* create1() {
    while (true) {
        yield new Promise(resolve => {
            setTimeout(() => resolve('timer' + new Date()), 1000);
        })
    }
}

forAwaitEach(create0(), console.log);

//rr const nums = [1, 2, 3];

// let index = 0;
// const iterator = {
//   next: () => {
//     if (index >= nums.length) {
//       return { done: true };
//     }
//     const value = nums[index++];
//     return { value, done: false };
//   }
// };

// const iterable = {
//     [Symbol.iterator]: () => iterator
//   };
//   for (const v of iterable) {
//     console.log(v); // Prints "1", "2", "3"
//   }
const nums = [1, 2, 3];

let index = 0;
const asyncIterator = {
  next: () => {
    if (index >= nums.length) {
      // A conventional iterator would return a `{ done: true }`
      // object. An async iterator returns a promise that resolves
      // to `{ done: true }`
      return Promise.resolve({ done: true });
    }
    const value = nums[index++];
    return Promise.resolve({ value, done: false });
  }
};

const asyncIterable = {
  // Note that async iterables use `Symbol.asyncIterator`, **not**
  // `Symbol.iterator`.
  [Symbol.asyncIterator]: () => asyncIterator
};

// main().catch(error => console.error(error.stack));

// async function main() {
//     for await (const value of asyncIterable) {
//       console.log(value);
//     }
//   }

 
function Chirper (to) {
  this.to = to
}
 
Chirper.prototype[$$asyncIterator] = function () {
  return {
    to: this.to,
    num: 0,
    next () {
      return new Promise(resolve => {
        if (this.num >= this.to) {
          resolve({ value: undefined, done: true })
        } else {
          setTimeout(() => {
            resolve({ value: this.num++, done: false })
          }, 1000)
        }
      })
    }
  }
}

forAwaitEach(new Chirper(3), console.log);