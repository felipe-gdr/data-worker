import { EventEmitter } from 'events';

const data = {
  something: {
    id: 'initial',
  }
};

const SOMETHING_TOPIC = 'topic:something';

const eventEmitter = new EventEmitter();

export const getSomething = () => data.something;

export const changeSomething = id => {
  data.something = { id };

  eventEmitter.emit(SOMETHING_TOPIC, data.something);

  console.log('listener count', eventEmitter.listenerCount(SOMETHING_TOPIC));
}

export const subscribeToSomething = () => {
  // holds data that will be processed
  const pushQueue = [];
  // holds resolve() functions that will process data
  const pullQueue = [];

  let done = false;

  const pushValue = (data) => {
    if (pullQueue.length !== 0) {
      const nextResolve = pullQueue.shift();
      nextResolve({ done, value: data});
    } else {
      pushQueue.push(data);
    }
  }

  // Send current state of data straight away
  pushQueue.push(getSomething());

  const pullValue = () => {
    return new Promise(resolve => {
      const nextData = pushQueue.shift();

      if (nextData) {
        resolve({ done, value: nextData});
      } else {
        pullQueue.push(resolve);
      }
    });
  }

  const handler = data => {
    pushValue(data);
  }

  eventEmitter.addListener(SOMETHING_TOPIC, handler);

  return {
    [Symbol.asyncIterator]() {
      return this
    },
    next: () => pullValue(),
    return: () => {
      done = true;
      eventEmitter.removeListener(SOMETHING_TOPIC, handler)
      return Promise.resolve({ done });
    },
    throw: (error) => {
      done = true;
      eventEmitter.removeListener(SOMETHING_TOPIC, handler)
      return ({ done, value: Promise.reject(error) })
    }
  }
}
