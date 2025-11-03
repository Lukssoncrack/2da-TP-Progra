import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDEZpDszPLGoTiz7w4wXs-3lm1E_RU8DIs",
  authDomain: "primerproyecto-c95d6.firebaseapp.com",
  projectId: "primerproyecto-c95d6",
  storageBucket: "primerproyecto-c95d6.firebasestorage.app",
  messagingSenderId: "327966636369",
  appId: "1:327966636369:web:47ef07328fa40c1aadbb70"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
