import 'firebase/firestore';
import 'firebase/auth';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

require('firebase/auth')

const firebaseConfig = {
    apiKey: "AIzaSyBjuA-59Tfcq9lNjeuO2BqIQBO2-6FQS2E",
    authDomain: "react-app-curso-18553.firebaseapp.com",
    projectId: "react-app-curso-18553",
    storageBucket: "react-app-curso-18553.appspot.com",
    messagingSenderId: "387983440908",
    appId: "1:387983440908:web:82381b4434ff4654fb4229",
    measurementId: "G-LGDZMZESYJ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 
const db = getFirestore();
 
const googleAuthProvider = new GoogleAuthProvider();


 
export{
    app,
    db,
    googleAuthProvider,

}