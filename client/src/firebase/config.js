// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBqIT_wzlKgFgHzdzehGx6S-sRD9bKjbV8',
  authDomain: 'datn-d800f.firebaseapp.com',
  projectId: 'datn-d800f',
  storageBucket: 'datn-d800f.appspot.com',
  messagingSenderId: '587973034578',
  appId: '1:587973034578:web:c994d4c3c1b9a5ca90958b',
  measurementId: 'G-EWX79XQ096',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
