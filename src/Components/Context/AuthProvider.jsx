// src/AuthContext.js
import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  signInWithCredential,
} from "firebase/auth";
import { app } from "../../firebase/firebase-config";
import { AuthContext } from "./AuthContext";
import { useGoogleOneTapLogin } from "@react-oauth/google";

const AuthProvider = ({ children }) => {
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState(null);

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  const handleGoogleOneTapSuccess = async (credentialResponse) => {
    console.log("Google One Tap Success:", credentialResponse);
    const idToken = credentialResponse.credential;

    const credential = GoogleAuthProvider.credential(idToken);
    try {
      await signInWithCredential(auth, credential);
      console.log("Signed in with Firebase using Google One Tap ID Token!");
    } catch (error) {
      console.error(
        "Firebase sign-in with Google One Tap credential failed:",
        error.message
      );
    }
  };

  const handleGoogleOneTapError = () => {
    console.log("Google One Tap/Login Failed or dismissed.");
  };

  useGoogleOneTapLogin({
    onSuccess: handleGoogleOneTapSuccess,
    onError: handleGoogleOneTapError,
  });

  useEffect(() => {
    const unSubs = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setLoader(false);
        return;
      }

      try {
        if (currentUser.providerData[0]?.providerId === "password") {
          const res = await fetch(
            `https://root-rhythms-server.vercel.app/user/${currentUser.uid}`
          );
          const data = await res.json();
          const userData = { ...currentUser, ...data };
          setUser(userData);
        } else {
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Failed to fetch user data or process auth state", error);
        setUser(currentUser);
      } finally {
        setLoader(false);
      }
    });

    return () => unSubs();
  }, []);

  const contextData = {
    name: "Shaharear",
    createUser,
    user,
    signOutUser,
    signInUser,
    googleSignIn,
    setUser,
    loader,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
