import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAfvH4OSSss-imdGAkeOGWuF4Oa1rhftfw",
  authDomain: "sqa-final-project.firebaseapp.com",
  projectId: "sqa-final-project",
  storageBucket: "sqa-final-project.appspot.com",
  messagingSenderId: "596442719187",
  appId: "1:596442719187:web:cd8b3c4bf1a1cddf424526",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
