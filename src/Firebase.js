import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBc7RUeHJAYy84j0_2N40d3WgyPdzY76DY",
  authDomain: "challenge-9b86d.firebaseapp.com",
  projectId: "challenge-9b86d",
  storageBucket: "challenge-9b86d.appspot.com",
  messagingSenderId: "991445694928",
  appId: "1:991445694928:web:18fa5fc4bff04228d9a1d5",
  measurementId: "G-3NEHJR33RC",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth();

export { db, auth };
