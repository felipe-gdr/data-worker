import { graphql, subscribe, parse } from 'graphql';

import schema from './index';

describe('schema', () => {

  describe('ubscribe returns asyncIterators', () => {
    test('edit an album', async () => {
      const query = 'subscription { albums { id, title, artist } }';

      const first = { 
        id: '-LUi8G6ZlrsYiwxenbb4',
        title: 'Led Zeppelin',
        artist: 'Led Zeppelin'
      };

      const edited = { 
        id: '-LUi8G6ZlrsYiwxenbb4',
        title: 'Led Zeppelin!!!',
        artist: 'Led Zeppelin'
      };

      const asyncIterator = await subscribe(schema, parse(query));

      const { value: { error, data } } = await asyncIterator.next();

      expect(error).toBeUndefined();
      expect(data.albums).toEqual(expect.arrayContaining([first])); 

      const mutation = 'mutation { editAlbum(id:"-LUi8G6ZlrsYiwxenbb4", title: "Led Zeppelin!!!", artist: "Led Zeppelin") { title } }';

      const result = await graphql(schema, mutation);
      expect(result.data.editAlbum).toEqual({ title: 'Led Zeppelin!!!' });

      const { value } = await asyncIterator.next();

      expect(value.data.albums).toEqual(expect.arrayContaining([edited])); 

      asyncIterator.return();
    });
    
    test('albums with titles', async () => {
      const query = 'subscription { albums { title } }';

      const expected = { title: 'Led Zeppelin' };

      const asyncIterator = await subscribe(schema, parse(query));

      const { value: { error, data } } = await asyncIterator.next();

      expect(error).toBeUndefined();
      expect(data.albums).toEqual(expect.arrayContaining([expected])); 

      asyncIterator.return();
    });

    test('albums with titles and artists', async () => {
      const query = 'subscription { albums { title, artist } }';

      const expected = { title: 'Led Zeppelin', artist: 'Led Zeppelin' };

      const asyncIterator = await subscribe(schema, parse(query));

      const { value: { error, data } } = await asyncIterator.next();

      expect(error).toBeUndefined();
      expect(data.albums).toEqual(expect.arrayContaining([expected])); 

      asyncIterator.return();
    });

    test('albums with titles, artists and reviews', async () => {
      const query = 'subscription { albums { title, artist, reviews { title, rating } } }';

      const expected = { 
        title: 'Led Zeppelin', 
        artist: 'Led Zeppelin', 
        reviews: [
          { 
            title: 'Good!', 
            rating: 5 
          }
        ] 
      };

      const asyncIterator = await subscribe(schema, parse(query));

      const { value: { error, data } } = await asyncIterator.next();

      expect(error).toBeUndefined();
      expect(data.albums).toEqual(expect.arrayContaining([expected])); 

      asyncIterator.return();
    });
  });

  describe('query', () => {
    test('albums with titles', async () => {
      const query = 'query { albums { title } }';

      const { error, data } = await graphql(schema, query);

      const expected = { title: 'Led Zeppelin' };

      expect(error).toBeUndefined(); 

      expect(data.albums).toEqual(expect.arrayContaining([expected])); 
    });

    test('albums with titles and artists', async () => {
      const query = 'query { albums { title, artist } }';

      const { error, data } = await graphql(schema, query);

      const expected = { title: 'Led Zeppelin', artist: 'Led Zeppelin' };

      expect(error).toBeUndefined(); 

      expect(data.albums).toEqual(expect.arrayContaining([expected])); 
    });

    test('albums with titles, artists and reviews', async () => {
      const query = 'query { albums { title, artist, reviews { title, rating } } }';

      const expected = { 
        title: 'Led Zeppelin', 
        artist: 'Led Zeppelin', 
        reviews: [
          { 
            title: 'Good!', 
            rating: 5 
          }
        ] 
      };

      const { error, data }  = await graphql(schema, query);

      expect(error).toBeUndefined();
      expect(data.albums).toEqual(expect.arrayContaining([expected])); 
    });
  });

});
