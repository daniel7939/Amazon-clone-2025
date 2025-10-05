// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgamjjl-tSgqsixTetoHnWfj2ZcH1Q_fU",
  authDomain: "clone-70221.firebaseapp.com",
  projectId: "clone-70221",
  storageBucket: "clone-70221.firebasestorage.app",
  messagingSenderId: "864138273277",
  appId: "1:864138273277:web:4e9c0ca7cee14e73697994"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);
const storage=getStorage(app);
export {auth,db,storage};