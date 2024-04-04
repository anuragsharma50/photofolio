// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuiVRg-ouPKrBya9iQFcA-Mqg3X307KG4",
  authDomain: "bloggin-app-eab0d.firebaseapp.com",
  projectId: "bloggin-app-eab0d",
  storageBucket: "bloggin-app-eab0d.appspot.com",
  messagingSenderId: "302199988835",
  appId: "1:302199988835:web:12bbbd53a969fdb184ce56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

