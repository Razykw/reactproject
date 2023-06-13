// firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCNe5TjYmOaMpoPDyDD_dOu2dYMCRoDbxQ",
  authDomain: "apple-store-9f99d.firebaseapp.com",
  projectId: "apple-store-9f99d",
  storageBucket: "apple-store-9f99d.appspot.com",
  messagingSenderId: "1000632800467",
  appId: "1:1000632800467:web:bc0aa4ec23316c07177026",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
export { db, auth };