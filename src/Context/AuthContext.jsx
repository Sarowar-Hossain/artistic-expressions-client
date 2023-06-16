import React, { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import AXIOS from "../Axios/UseAxios";

export const UserContext = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isInstructor, setIsInstructor] = useState(false);
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);

  const googleLogin = () => {
    setLoading(false);
    return signInWithPopup(auth, provider);
  };

  const registerUser = (email, password) => {
    setLoading(false);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userProUpdate = (name, photo) => {
    setLoading(false);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
      setUser(loggedUser);
      if (loggedUser?.email) {
        AXIOS.post("/JWT-Token", { email: loggedUser?.email }).then((res) => {
          // console.log('auth AXIOS: ',res);
          localStorage.setItem("access-token", res.data?.token);
        });
      }

      setLoading(false);
    });
    return unsubscribe();
  }, [user]);

  const userLogOut = () => {
    return signOut(auth);
  };

  const loginUser = (email, password) => {
    setLoading(false);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const info = {
    user,
    googleLogin,
    registerUser,
    userProUpdate,
    userLogOut,
    loginUser,
    loading,
    isInstructor,
    setIsInstructor,
    isAdmin,
    setIsAdmin,
    setUser
  };
  return (
    <div>
      <UserContext.Provider value={info}>{children}</UserContext.Provider>
    </div>
  );
};

export default AuthContext;
