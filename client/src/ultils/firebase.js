// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: 'quickbooking-7ae9f.firebaseapp.com',
    projectId: 'quickbooking-7ae9f',
    storageBucket: 'quickbooking-7ae9f.appspot.com',
    messagingSenderId: '639785029841',
    appId: '1:639785029841:web:0d47f3a12226c13845b5f0',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
