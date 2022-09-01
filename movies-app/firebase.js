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
 error messages,
 conditional rendering according to auth,
 account page
*/


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
    }catch (error){
        console.log(error.message);
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
        console.log(error.message);
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
        console.log(error.message,error.customData,credential);
    }
}


export const signOut = async () =>{
    try {
        await signOutOfFirebase(auth);
    }catch (error){
        console.log(error.message);
    }
}

export const sendEmailVery= async () =>{
    try {
        await sendEmailVerification(auth.currentUser);
    }catch (error){
        console.log(error.message);
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
        console.log(error.message);
    }
}

export const updEmail = async (newEmail)=>{
    try{
        await updateEmail(auth.currentUser,newEmail);
    }
    catch (error){
        console.log(error.message);
    }
}


export const updPassword = async (newPassword)=>{
    try{
        await updatePassword(auth.currentUser,newPassword);
    }
    catch (error){
        console.log(error.message);
    }
}
export const deleteAccount = async ()=>{
    try{
        /* await deleteDoc(doc(db, "users", auth.currentUser.uid)); */
        await deleteUser(auth.currentUser);
    }
    catch (error){
        console.log(error.message);
    }
}


onAuthStateChanged(auth, (user) => {

    if (user) {
        store.dispatch(handleLogIn(user));
    } else {
        store.dispatch(handleLogOut());
    }
});