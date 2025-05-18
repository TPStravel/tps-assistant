// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // 👈 Adicionado

const firebaseConfig = {
  apiKey: "AIzaSyAeuBX84PaJlyT9CgSTWDVmA0DNl_bRS8o",
  authDomain: "tps-assistant-2ea6b.firebaseapp.com",
  projectId: "tps-assistant-2ea6b",
  storageBucket: "tps-assistant-2ea6b.appspot.com",
  messagingSenderId: "797016519687",
  appId: "1:797016519687:web:94a65c03712a7b24492482",
  measurementId: "G-RXH1T2N193"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // 👈 Adicionado

export { db, auth };
