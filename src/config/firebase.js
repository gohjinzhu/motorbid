import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBr0_C-QwehLK1-7YnMyreZRzy8dwyz4KE",
  authDomain: "motorbid-3c325.firebaseapp.com",
  projectId: "motorbid-3c325",
  storageBucket: "motorbid-3c325.appspot.com",
  messagingSenderId: "585454291264",
  appId: "1:585454291264:web:39a52b642ca0f1992392a5",
  measurementId: "G-WX28Z05LV9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);