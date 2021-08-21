import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDWfr-oumRodHtVJbzJd6TqfyI67TBbLSk",
  authDomain: "cms-internship-87e6e.firebaseapp.com",
  projectId: "cms-internship-87e6e",
  storageBucket: "cms-internship-87e6e.appspot.com",
  messagingSenderId: "498293168633",
  appId: "1:498293168633:web:ea24cbd064da099f2c4528",
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectStorage = firebase.storage();

export { projectFirestore, projectStorage };
