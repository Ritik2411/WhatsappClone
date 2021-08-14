import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyC165TF8qjPdu4yYITxkJP3h1iD-N9OrwQ",
    authDomain: "whatsappclone-740d8.firebaseapp.com",
    projectId: "whatsappclone-740d8",
    storageBucket: "whatsappclone-740d8.appspot.com",
    messagingSenderId: "589953527164",
    appId: "1:589953527164:web:465b75a726c2070a52c8f9",
    measurementId: "G-M0QE00Y1YY"
  };
  // Initialize Firebase
const firebaseapp =  firebase.initializeApp(firebaseConfig);
const db = firebaseapp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider();

export {auth,provider}
export default db