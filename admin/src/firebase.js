import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import firebase from "firebase/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCBTA94rvKfuX7H3Hyk5ckgvqJzf4PuVAQ",
  authDomain: "shop-6c491.firebaseapp.com",
  projectId: "shop-6c491",
  storageBucket: "shop-6c491.appspot.com",
  messagingSenderId: "460307944632",
  appId: "1:460307944632:web:0cdebe394764f3bdccd04d",
  measurementId: "G-LQJY5K7G88",
};

firebase.initializeApp(firebaseConfig);
// const storage = firebase.storage();
const storage = firebase.storage();
export default storage;
