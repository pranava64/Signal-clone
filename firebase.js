// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";  


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwSSse0k81wPAn5jXg7YPlQ39ofTA2V30",
  authDomain: "signal-clone-demo-e62f5.firebaseapp.com",
  projectId: "signal-clone-demo-e62f5",
  storageBucket: "signal-clone-demo-e62f5.appspot.com",
  messagingSenderId: "366600021298",
  appId: "1:366600021298:web:23c1dc74fb0deb6c59a32b"
};

// Initialize Firebase
let app;
if(firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig);
}else{
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export {db, auth};
