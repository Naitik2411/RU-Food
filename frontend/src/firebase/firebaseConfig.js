// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPDqmy6VlnTf8YrRoM2tEJIdDu2vYIEEs",
  authDomain: "ru-food.firebaseapp.com",
  projectId: "ru-food",
  storageBucket: "ru-food.firebasestorage.app",
  messagingSenderId: "1007983570328",
  appId: "1:1007983570328:web:b3a74faa4d6676c293cfed",
  measurementId: "G-PCGHEKPSHK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
export const auth =  getAuth(app)
export const googleProvider = new GoogleAuthProvider();

