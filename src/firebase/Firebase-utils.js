import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyBpafNsmn9nOXEl7cgzCYwPO0e8V1bDoBs",
  authDomain: "react-dev-chat-team.firebaseapp.com",
  databaseURL: "https://react-dev-chat-team.firebaseio.com",
  projectId: "react-dev-chat-team",
  storageBucket: "react-dev-chat-team.appspot.com",
  messagingSenderId: "834554456",
  appId: "1:834554456:web:e78a77b86244eab054982d",
  measurementId: "G-4T9WL1H9VW",
};

firebase.initializeApp(config);

export default firebase;
