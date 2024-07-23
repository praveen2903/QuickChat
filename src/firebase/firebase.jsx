import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCmEJkawA1ASJtGXAtl9BxZx30EDCp4zeQ",
  authDomain: "chatapp-praveen.firebaseapp.com",
  projectId: "chatapp-praveen",
  storageBucket: "chatapp-praveen.appspot.com",
  messagingSenderId: "189610174527",
  appId: "1:189610174527:web:299d90914655ec8201308a",
  measurementId: "G-9QZJXR4M5N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const storage = getStorage(app);
export const db=getFirestore(app)
export const googleprovider=new GoogleAuthProvider()
export const githubprovider=new GithubAuthProvider()
export const facebookprovider=new FacebookAuthProvider()