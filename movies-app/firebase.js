import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut as signOutOfFirebase,
    onAuthStateChanged,sendEmailVerification,
    setPersistence,browserLocalPersistence,browserSessionPersistence,
    signInWithPopup, GoogleAuthProvider,
    updateProfile,updateEmail,updatePassword,deleteUser} from "firebase/auth";
import { getFirestore,doc, setDoc ,getDoc,updateDoc,deleteDoc} from "firebase/firestore";

import store from "./stores";
import {logIn as handleLogIn,logOut as handleLogOut} from "./stores/auth";


const errors ={
    "auth/email-already-in-use" : "E-mail already in use. Please type a new e-mail or sign in with this e-mail.",
    "auth/email-already-exists" : "E-mail already in use. Please type a new e-mail or sign in with this e-mail.",
    "auth/internal-error" : "An unexpected error occurred. Please try again later.",
    "auth/invalid-argument" : "Invalid arguments",
    "auth/invalid-email" : "You typed a invalid e-mail address. Please type a valid e-mail.",
    "auth/invalid-password" : "You typed a invalid password. Please type a valid password.",
    "auth/wrong-password" : "Wrong password.Please make sure you enter your password correctly.",
    "auth/user-not-found" : "Wrong password or E-mail address. Please make sure you enter your email address and password correctly.",
}


const firebaseConfig = {
    apiKey: process.env["NEXT_PUBLIC_API_KEY "],
    authDomain:  process.env["NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN "],
    projectId: process.env["NEXT_PUBLIC_FIREBASE_PROJECT_ID "],
    storageBucket:  process.env["NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET "],
    messagingSenderId:  process.env["NEXT_PUBLIC_FIREBASE_MESSAGING_ID "],
    appId:  process.env["NEXT_PUBLIC_FIREBASE_APP_ID "],
    databaseURL: process.env["NEXT_PUBLIC_DATABASE_URL "],
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export const currentUser = auth.currentUser;

export const signUp = async (email,password,rememberMe) =>{
    try {
        if(rememberMe){
            await setPersistence(auth,browserLocalPersistence);
        }else{
            await setPersistence(auth,browserSessionPersistence);
        }
        await createUserWithEmailAndPassword(auth,email,password);

        await setDoc(doc(db, "users", auth.currentUser.uid), {
            bookmarks :[],
        });
        return null;
    }catch (error){
    return errors[error.code];
    }
}

export const signIn = async (email,password,rememberMe) =>{
    try {
        if(rememberMe){
            await setPersistence(auth,browserLocalPersistence);
        }else{
            await setPersistence(auth,browserSessionPersistence);
        }
        await signInWithEmailAndPassword(auth,email,password);
    }catch (error){
        return errors[error.code];
    }
}

export const signInWithGoogle = async ()=>{
    try{

        await setPersistence(auth,browserLocalPersistence);
        const result =  await signInWithPopup(auth, provider);

        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if(!docSnap.data()){
            await setDoc(doc(db, "users", auth.currentUser.uid), {
                bookmarks :[],
            });
        }


        await GoogleAuthProvider.credentialFromResult(result);

    }catch(error) {
        const credential = GoogleAuthProvider.credentialFromError(error);
        return errors[error.code];
    }
}


export const signOut = async () =>{
    try {
        await signOutOfFirebase(auth);

    }catch (error){
        return errors[error.code];
    }
}

export const sendEmailVery= async () =>{
    try {
        await sendEmailVerification(auth.currentUser);
    }catch (error){
        console.log(error);
        return error.message;
    }
}

export const updProfile = async (newName,newPhotoUrl)=>{
    try{
        await updateProfile(auth.currentUser,{
            displayName:newName,
            photoURL:newPhotoUrl,
        });
    }
    catch (error){
        return errors[error.code];
    }
}

export const updEmail = async (newEmail)=>{
    try{
        console.log(newEmail);
        await updateEmail(auth.currentUser,newEmail);
    }
    catch (error){
        return errors[error.code];
    }
}


export const updPassword = async (newPassword)=>{
    try{
        await updatePassword(auth.currentUser,newPassword);
    }
    catch (error){
        return errors[error.code];
    }
}
export const deleteAccount = async ()=>{
    try{
        await deleteDoc(doc(db, "users", auth.currentUser.uid));
        await deleteUser(auth.currentUser);
    }
    catch (error){
        return errors[error.code];
    }
}

export const getBookmarks = async () =>{
    try {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        const bookmarks = docSnap.data().bookmarks
        return new Promise(resolve => {
            if(bookmarks) resolve({bookmarks,docSnap});
        });
    }
    catch (error){
        return {docSnap:null,bookmarks:null};
    }
}
export const addBookmark = async (newBookmark)=>{

    try{
        const docRef = doc(db, "users", auth.currentUser.uid);

        const docSnap = await getDoc(docRef);
        const existData = docSnap.data().bookmarks

        await updateDoc(docRef, {
            bookmarks: [...existData, newBookmark],
        });
    }catch (error){
        console.log(error.message);
    }
}
export const deleteBookmark = async (dltBookmark) =>{
    try{
        const docRef = doc(db, "users",auth.currentUser.uid);

        const docSnap = await getDoc(docRef);
        const existData = docSnap.data().bookmarks
        const newData = existData.filter(item => item !== dltBookmark);


        await updateDoc(docRef, {
            bookmarks: newData,
        });
    }catch (error){
        console.log(error.message);
    }
}

onAuthStateChanged(auth, (user) => {

    if (user) {
        store.dispatch(handleLogIn(user));
    } else {
        store.dispatch(handleLogOut(false));
    }
});