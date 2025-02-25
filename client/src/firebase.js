// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-real-state-app.firebaseapp.com",
  projectId: "mern-real-state-app",
  storageBucket: "mern-real-state-app.firebasestorage.app",
  messagingSenderId: "370135654552",
  appId: "1:370135654552:web:d3f84702f9a88824fd30ed",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
