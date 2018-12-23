import { getSomething, subscribeToSomething } from '../repository';

export default {
  Query: {
    somethingChanged: getSomething,
  },
  Subscription: {
    somethingChanged: {
      subscribe: subscribeToSomething,
      resolve: value => value
    }
  }
};
