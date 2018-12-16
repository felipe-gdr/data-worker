
// This module is unused at the moment

import data from './data/example-data.json';
import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();

class ArtistResolver {
    constructor(item) {
        this.item = item;
    }

    name() {
        return this.item.artist;
    }

    albums() {
        return this.item.albums;
    }
}

const SOMETHING_CHANGED_TOPIC = 'something_changed';

setInterval(() => {
    pubsub.publish(SOMETHING_CHANGED_TOPIC, { somethingChanged: { id: "123" + new Date() } });
}, 1000);

export default {
    artists: ({ searchQuery = '' }) => data
        .filter(item => item.artist.indexOf(searchQuery) >= 0)
        .map(item => new ArtistResolver(item)),
    albums: ({ artistName = '' }) => {
        return data.albums.filter(album => album.artist.name.indexOf(artistName) >= 0);
    },
    somethingChanged: {
        subscribe: () => {
            return pubsub.asyncIterator(SOMETHING_CHANGED_TOPIC)
        },
    }
}
