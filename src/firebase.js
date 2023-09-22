import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCEPQ_Vb-ogN4re7T5WKzoHmVYSXsaDaO0",
  authDomain: "whats-app-clone-2c5f0.firebaseapp.com",
  projectId: "whats-app-clone-2c5f0",
  storageBucket: "whats-app-clone-2c5f0.appspot.com",
  messagingSenderId: "781526081759",
  appId: "1:781526081759:web:1f651a963c526c3a00c96a",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const firestore = getFirestore(firebaseApp);

export const auth = getAuth(firebaseApp);

export const roomsRef = collection(firestore, "room");
