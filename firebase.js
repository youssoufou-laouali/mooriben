import { initializeApp } from 'firebase/app'
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut, GoogleAuthProvider } from 'firebase/auth'
import React, { useState, useEffect } from 'react';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const firebaseApp = initializeApp(firebaseConfig)
const storage = getStorage(firebaseApp);

const storageRef = ref(storage);

const db = getFirestore(firebaseApp);
const auth = getAuth();

const provider = new GoogleAuthProvider();

function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            return userCredential.user;
        })
        .catch((error) => {
            return error;
        });
}

function signin(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            return userCredential.user;
        })
        .catch((error) => {
            return error
        });
}

function signout() {
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}

function useFirebaseAuth() {
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        onAuthStateChanged(auth, user => setCurrentUser(user))
    }, [])

    return currentUser;
}

function updateUserProfile(data) {
    updateProfile(auth.currentUser, { displayName: `${data.firstName}-${data.lastName}`, photoURL: data.photoURL })
        .then((response) => {
            console.log("User update" + response);
        })
        .catch((err) => {
            console.log(err);
        })
}

export {
    storage,
    storageRef,
    db,
    signup,
    signin,
    useFirebaseAuth,
    updateUserProfile,
    signout
}