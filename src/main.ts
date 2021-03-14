import App from './App.svelte';
// import firebase from "firebase/app";
// import "firebase/firestore";

// var firebaseConfig = {
// 	apiKey: "AIzaSyCOzgYzAMeBNtT-h8Z971zlakx8qb_3iGQ",
// 	authDomain: "dbfz-notes.firebaseapp.com",
// 	projectId: "dbfz-notes",
// 	storageBucket: "dbfz-notes.appspot.com",
// 	messagingSenderId: "532925697770",
// 	appId: "1:532925697770:web:9d56256245747b2013d193"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// var db = firebase.firestore();


const app = new App({
	target: document.body,
	intro: true
});

export default app;