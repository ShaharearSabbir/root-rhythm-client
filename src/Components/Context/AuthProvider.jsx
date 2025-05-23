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
        console.error("Failed to fetch user data", error);
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
