import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database';

let firebaseConfig = {
  apiKey: "AIzaSyDeI5ZZWd1j_IPmX0Qwz4VZTeSurowhVxo",
  authDomain: "appfinancas-b3552.firebaseapp.com",
  projectId: "appfinancas-b3552",
  storageBucket: "appfinancas-b3552.appspot.com",
  messagingSenderId: "602969403950",
  appId: "1:602969403950:web:6f3161b9a8c8e9fca2e5bf",
  measurementId: "G-KS3N07490S"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);  
}

export default firebase;
