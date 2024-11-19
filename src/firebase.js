// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.VITE_APP_apiKey,
  authDomain: process.env.VITE_APP_authDomain,
  projectId: process.env.VITE_APP_projectId,
  storageBucket: process.env.VITE_APP_storageBucket,
  messagingSenderId: process.env.VITE_APP_messagingSenderId,
  appId: process.env.VITE_APP_appId,
  measurementId: process.env.VITE_APP_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
