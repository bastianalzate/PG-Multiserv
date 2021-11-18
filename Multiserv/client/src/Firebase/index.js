// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword, 
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider,
    sendEmailVerification
} from 'firebase/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
function signUp (email, password){
    return createUserWithEmailAndPassword(auth, email, password)
}
function signWithGoogle () {
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleProvider)
}
function verifyEmailAddress() {
    console.log(auth.currentUser)
    return sendEmailVerification(auth.currentUser)
}
export {auth, signUp, signWithGoogle, verifyEmailAddress}