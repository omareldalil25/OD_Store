// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB88hu-G772pioigD-dGM9K8y8HDwa8zmA",
  authDomain: "od-store-83ba1.firebaseapp.com",
  projectId: "od-store-83ba1",
  storageBucket: "od-store-83ba1.appspot.com",
  messagingSenderId: "89464580354",
  appId: "1:89464580354:web:eece95a990fbda6f3afa1b",
  measurementId: "G-XGS3WGEYKZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
