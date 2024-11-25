import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const API_KEY = import.meta.env.VITE_API_KEY;

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: "movieauth-7ac61.firebaseapp.com",
    projectId: "movieauth-7ac61",
    storageBucket: "movieauth-7ac61.appspot.com",
    messagingSenderId: "181525429025",
    appId: "1:181525429025:web:44d655e5d5127fd50e1c60"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {app, auth, db};


