import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDoc, getDocs } from 'firebase/firestore';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyBfGzezMzKir_RRjstU0bUiSkCb8pjRQWE",
    authDomain: "preorder-d773a.firebaseapp.com",
    databaseURL: "https://preorder-d773a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "preorder-d773a",
    storageBucket: "preorder-d773a.appspot.com",
    messagingSenderId: "676616876310",
    appId: "1:676616876310:web:3b8a52fd360f80f4cbe037",
    measurementId: "G-JMRW6EP3ST"
  });

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

onAuthStateChanged(auth, user => {
    if(user != null) {
        console.log('logged in!');
    } else {
        console.log('No user');
    }
});

  // firebase config 정보가 client 측에 있으면 보안 위험 있는거 아니냐
  // 