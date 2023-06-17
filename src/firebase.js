import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVvkSJCt4U3IHtHvkEajSFuufl0IOZdto",
  authDomain: "chat-21b55.firebaseapp.com",
  projectId: "chat-21b55",
  storageBucket: "chat-21b55.appspot.com",
  messagingSenderId: "766083211179",
  appId: "1:766083211179:web:2d02121c53d4c04ced3cee",
  measurementId: "G-5L9KKC2Y0J"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
