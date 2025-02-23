// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-real-state-c14e6.firebaseapp.com",
  projectId: "mern-real-state-c14e6",
  storageBucket: "mern-real-state-c14e6.firebasestorage.app",
  messagingSenderId: "910733788945",
  appId: "1:910733788945:web:f666df8dbc3afebb226eb0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);