const firebase = require('firebase/app');
require('firebase/auth')
require('firebase/firestore')
const { firebaseConfig } = require('./firebaseConfig');
const firebaseApp = firebase.initializeApp(firebaseConfig);
exports.db = firebaseApp.firestore();
exports.auth = firebaseApp.auth();