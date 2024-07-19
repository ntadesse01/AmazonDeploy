import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACYwV_Vv6swEqNsoIfiX7YmOMtfWi2mpA",
  authDomain: "amaevapro-fc2fd.firebaseapp.com",
  projectId: "amaevapro-fc2fd",
  storageBucket: "amaevapro-fc2fd.appspot.com",
  messagingSenderId: "120853276646",
  appId: "1:120853276646:web:ecccf15db12a24bd121827"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();

 