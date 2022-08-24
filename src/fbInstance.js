import * as firebase from "firebase/app";
import * as firebaseAuth from "firebase/auth";
import * as firebaseStore from "firebase/firestore";
import * as firebaseStorage from "firebase/storage"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
  };
  
firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebaseAuth;
export const firebaseDB = firebaseStore;
export const storageService = firebaseStorage;