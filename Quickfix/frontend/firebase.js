// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWW0wsQZpRWRIbOoJROIeRB4JX00IetpM",
  authDomain: "quickfix-281be.firebaseapp.com",
  projectId: "quickfix-281be",
  storageBucket: "quickfix-281be.appspot.com",
  messagingSenderId: "666109248020",
  appId: "1:666109248020:web:41648ece1c214ffe381d01",
  measurementId: "G-6NEFBDS3TQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);