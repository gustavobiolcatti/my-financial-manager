// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxEKPRL2FtQ35dFwZCN1hYAXFsKdmaGCA",
  authDomain: "financial-manager-d471a.firebaseapp.com",
  projectId: "financial-manager-d471a",
  storageBucket: "financial-manager-d471a.appspot.com",
  messagingSenderId: "48949868695",
  appId: "1:48949868695:web:431e091ec729e63d1651d2",
  measurementId: "G-P94XF1YLPB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);