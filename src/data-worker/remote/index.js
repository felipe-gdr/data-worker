import firebase from 'firebase/app';
import 'firebase/database';

const projectId = 'music-store-2000';
const apiKey = 'AIzaSyClBOjnCQDpVzrtlyWNxwDTkolteWIR1CM';

const config = {
  apiKey,
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL: `https://${projectId}.firebaseio.com`,
}

const database = firebase.initializeApp(config).database();

const toArray = entries => Object.keys(entries).map(id => ({
  id,
  ...entries[id],
}));

const get = path => database
  .ref(path)
  .once('value')
  .then(dataSnapshot => dataSnapshot.val());

export const getAllAlbums = async () => {
  const albums = await get('albums')
  return toArray(albums).filter(Boolean);
}

export const getAlbum = async (id) => {
  const album = await get(`albums/${id}`);

  return album;
}

export const getReviews = async (albumId) => {
  const reviews = await get(`reviews/${albumId}`);
  const reviewsArr = toArray(reviews);

  return reviewsArr;
}

export const addReview = ({ albumId, title, rating }) => database
  .ref(`reviews/${albumId}`)
  .push({ title, rating })
  .then(ref => ref.once('value'))
  .then(dataSnapshot => ({
    id: dataSnapshot.key,
    ...dataSnapshot.val()
  }));

export const addAlbum = ({ title, artist, coverUrl}) => database
  .ref('albums/')
  .push({ title, artist, coverUrl })
  .then(ref => ref.once('value'))
  .then(dataSnapshot => ({
    id: dataSnapshot.key,
    ...dataSnapshot.val()
  }))
