import { EventEmitter } from 'events';
import * as remote from './remote';

const ALBUMS_TOPIC = 'topic:albums';

const eventEmitter = new EventEmitter();

export const subscribe = async () => {
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
  const albums = await remote.getAllAlbums(); 
    
  pushQueue.push(albums);

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

  const handler = async ({ type, payload }) => {
    const albums = await remote.getAllAlbums(); 
    
    pushValue(albums);
  }

  eventEmitter.addListener(ALBUMS_TOPIC, handler);

  return {
    [Symbol.asyncIterator]() {
      return this
    },
    next: () => pullValue(),
    return: () => {
      done = true;
      eventEmitter.removeListener(ALBUMS_TOPIC, handler)
      return Promise.resolve({ done });
    },
    throw: (error) => {
      done = true;
      eventEmitter.removeListener(ALBUMS_TOPIC, handler)
      return ({ done, value: Promise.reject(error) })
    }
  }
}
