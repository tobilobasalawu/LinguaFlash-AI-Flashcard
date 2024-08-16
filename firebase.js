// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirebase } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjYwoDeJ79g_Zov2BQG-8IefXDjto_iZc",
  authDomain: "linguaflash-ai-flashcard.firebaseapp.com",
  projectId: "linguaflash-ai-flashcard",
  storageBucket: "linguaflash-ai-flashcard.appspot.com",
  messagingSenderId: "955079957668",
  appId: "1:955079957668:web:9edcf929cff4b45733da31",
  measurementId: "G-GFHX52H3TH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirebase(app);

export { db };