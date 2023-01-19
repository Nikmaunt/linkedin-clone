import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyAHJXEhRHNhIPa5q5sFYJ-PdNvZYIQvzHU",
    authDomain: "linkedin-clone-503c7.firebaseapp.com",
    projectId: "linkedin-clone-503c7",
    storageBucket: "linkedin-clone-503c7.appspot.com",
    messagingSenderId: "599883494502",
    appId: "1:599883494502:web:17085b8862ebbf9739e9a7"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
export const db = firebaseApp.firestore()
export const auth = firebase.auth()

