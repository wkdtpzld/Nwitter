import AppRouter from "./Router";
import React, { useEffect, useState } from "react";
import { authService } from "fbInstance";


function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged(authService.getAuth(), (user) => {
      if (user) {
        setLoggedIn(true);
        setUserObj(user);

      } else {
        setLoggedIn(false);
      };
      setInit(true);
    })
  }, [])

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={ userObj } /> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
