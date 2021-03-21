const firebase = require('firebase/app');
require('firebase/firestore')
const { firebaseConfig } = require('./firebaseConfig');
const firebaseApp = firebase.initializeApp(firebaseConfig);
exports.db = firebaseApp.firestore();