// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEvFn_DZdIz02RhBkQcgpwfzha8_YffcY",
  authDomain: "looksmaxxer-aec39.firebaseapp.com",
  projectId: "looksmaxxer-aec39",
  storageBucket: "looksmaxxer-aec39.firebasestorage.app",
  messagingSenderId: "1079126327138",
  appId: "1:1079126327138:web:f60d7ce283423c415f363b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
