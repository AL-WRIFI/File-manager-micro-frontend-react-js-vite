import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASssQBRm0LPO3fqDT-ixhww4tGRMEVq0M",
  authDomain: "file-manager-reactjs-df244.firebaseapp.com",
  projectId: "file-manager-reactjs-df244",
  storageBucket: "file-manager-reactjs-df244.appspot.com",
  messagingSenderId: "705030534651",
  appId: "1:705030534651:web:7885ac02eb45c3799bc75e"
};

// const fire= initializeApp(firebaseConfig);
// const auth = getAuth(fire);
const fire= firebase.initializeApp(firebaseConfig);


export default fire;