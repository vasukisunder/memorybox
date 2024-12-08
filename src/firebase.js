import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Get these values from your Firebase Console
  // Project Settings -> General -> Your Apps -> SDK setup and configuration
  apiKey: "AIzaSyBO4ibrkaSmTGJeGdKV0omXUeDTXc7I4oA",
  authDomain: "memorybox-dt.firebaseapp.com",
  projectId: "memorybox-dt",
  storageBucket: "memorybox-dt.firebasestorage.app",
  messagingSenderId: "777208057773",
  appId: "1:777208057773:web:30b58365ee86ff63f61b24",
  measurementId: "G-HJW8ZWEPZ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 