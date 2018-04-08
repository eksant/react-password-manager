import firebase from 'firebase';
import 'firebase/firestore';

var config = {
  apiKey: 'AIzaSyD67x1z45ekYKY1HelmwD6Y-kV-SEuw8UU',
  authDomain: 'eksa-passportal.firebaseapp.com',
  databaseURL: 'https://eksa-passportal.firebaseio.com',
  projectId: 'eksa-passportal',
  storageBucket: 'eksa-passportal.appspot.com',
  messagingSenderId: '423115951445'
};

firebase.initializeApp(config);
export const passportals = firebase.firestore().collection('passportals');