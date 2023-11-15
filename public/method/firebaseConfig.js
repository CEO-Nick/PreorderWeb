var firebaseConfig = {
    apiKey: "AIzaSyBfGzezMzKir_RRjstU0bUiSkCb8pjRQWE",
    authDomain: "preorder-d773a.firebaseapp.com",
    databaseURL: "https://preorder-d773a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "preorder-d773a",
    storageBucket: "preorder-d773a.appspot.com",
    messagingSenderId: "676616876310",
    appId: "1:676616876310:web:3b8a52fd360f80f4cbe037",
    measurementId: "G-JMRW6EP3ST"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();
const auth = firebase.auth();