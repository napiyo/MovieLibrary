// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClkfIIqzhXETIuIapredV-rsh8M5SbgMQ",
  authDomain: "fasalmovies.firebaseapp.com",
  projectId: "fasalmovies",
  storageBucket: "fasalmovies.appspot.com",
  messagingSenderId: "394786097518",
  appId: "1:394786097518:web:5f59161ab83a6901de597f",
  measurementId: "G-0BJJPPCYY0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export default auth;