import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDsdrvDFfTj1Xc_0uhyOMVvVrjGZb5wUtQ",
  authDomain: "chatapp29-554c8.firebaseapp.com",
  projectId: "chatapp29-554c8",
  storageBucket: "chatapp29-554c8.appspot.com",
  messagingSenderId: "978008534924",
  appId: "1:978008534924:web:e2803cd629b8b779b3f0a9",
  measurementId: "G-H0CM72THXB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const storage = getStorage(app);
export const db=getFirestore(app)
export const googleprovider=new GoogleAuthProvider()
export const githubprovider=new GithubAuthProvider()
export const facebookprovider=new FacebookAuthProvider()