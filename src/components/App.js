import AppRouter from "./Router";
import React, { useEffect, useState } from "react";
import { authService } from "fbInstance";


function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged(authService.getAuth(), (user) => {
      if (user) {
        setUserObj(user);
      } 
      setInit(true);
    })
  }, [])

  const refreshUser = async() => {
    const reUser = await authService.getAuth().currentUser;

    setUserObj({
      displayName: reUser.displayName,
      uid: reUser.uid,
      updateProfile: (args) => authService.updateProfile(authService.getAuth().currentUser, {
        displayName: args
      })
    });
  }

  return (
    <>
      {init ? (
        <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
      {/* <footer>&copy; {new Date().getFullYear()} Nwitter</footer> */}
    </>
  );
}

export default App;
