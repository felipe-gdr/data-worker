import * as firebase from 'firebase';

const projectId = 'music-store-2000';
const apiKey = 'AIzaSyClBOjnCQDpVzrtlyWNxwDTkolteWIR1CM';

const config = {
  apiKey,
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL: `https://${projectId}.firebaseio.com`,
}

const database = firebase.initializeApp(config).database();

const get = path => database
  .ref(path)
  .once('value')
  .then(dataSnapshot => dataSnapshot.val());

export const getAllAlbums = async () => {
  const albums = await get('albums')
    
  return albums.filter(Boolean);
}

export const getAlbum = id => get(`albums/${id}`);
