import { initializeApp } from "firebase/app";

import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut as signOutOfFirebase,
    onAuthStateChanged,sendEmailVerification,
    setPersistence,browserLocalPersistence,browserSessionPersistence,
    signInWithPopup, GoogleAuthProvider,
    updateProfile,updateEmail,updatePassword,deleteUser} from "firebase/auth";
/*
import { getFirestore,doc, setDoc ,getDoc,updateDoc,deleteDoc} from "firebase/firestore";

*/

/*

TODO
 conditional rendering according to auth,
 account page
*/
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

import store from "./stores";
import {logIn as handleLogIn,logOut as handleLogOut} from "./stores/auth";
import toast from "react-hot-toast";


const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain:  process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket:  process.env.storageBucket,
    messagingSenderId:  process.env.messagingSenderId,
    appId:  process.env.appId
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export const currentUser = auth.currentUser;

export const signUp = async (email,password,rememberMe) =>{
    try {
        if(rememberMe){
            await setPersistence(auth,browserLocalPersistence);
        }else{
            await setPersistence(auth,browserSessionPersistence);
        }
        await createUserWithEmailAndPassword(auth,email,password);
        /*
        await setDoc(doc(db, "users", auth.currentUser.uid), {
            bookmarks :[],
        });*/
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
/*
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if(!docSnap.data()){
            await setDoc(doc(db, "users", auth.currentUser.uid), {
                bookmarks :[],
            });
        }
        */

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
        return errors[error.code];
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
        /* await deleteDoc(doc(db, "users", auth.currentUser.uid)); */
        await deleteUser(auth.currentUser);
    }
    catch (error){
        return errors[error.code];
    }
}


onAuthStateChanged(auth, (user) => {

    if (user) {
        store.dispatch(handleLogIn(user));
    } else {
        store.dispatch(handleLogOut());
    }
});