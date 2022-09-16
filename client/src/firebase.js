// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLQmjzhDcuvwZXdKhvVPN5gwdWObgC0Dg",
  authDomain: "sneakerparadise-auth.firebaseapp.com",
  projectId: "sneakerparadise-auth",
  storageBucket: "sneakerparadise-auth.appspot.com",
  messagingSenderId: "1025423775792",
  appId: "1:1025423775792:web:a39eeda1a079112c3435f5",
  measurementId: "G-36BFX87LH4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app