import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../../firebase/firebase-config";

const AuthProvider = ({ children }) => {
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

  useEffect(() => {
    const unSubs = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser.providerData[0]?.providerId === "password") {
        try {
          const res = await fetch(
            `http://localhost:5000/user/${currentUser.uid}`
          );
          const data = await res.json();
          const userData = { ...currentUser, ...data };
          setUser(userData);
        } catch {
          setUser(currentUser);
        }
      } else {
        setUser(currentUser);
      }

      console.log(currentUser);
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
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
