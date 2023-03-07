// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB11sb3ojoO7z__3jJ0F8VJwoD6m-Fr5hg",
  authDomain: "my-financial-manager-9aac5.firebaseapp.com",
  databaseURL: "https://my-financial-manager-9aac5-default-rtdb.firebaseio.com",
  projectId: "my-financial-manager-9aac5",
  storageBucket: "my-financial-manager-9aac5.appspot.com",
  messagingSenderId: "1063854061040",
  appId: "1:1063854061040:web:5454c150c3f80304721935",
  measurementId: "G-F04CW2FL1V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getDatabase(app);
