import AppRouter from "./Router";
import React, { useEffect, useState } from "react";
import { authService } from "../fbInstance";


function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged(authService.getAuth(), (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      };
      setInit(true);
    })
  }, [])

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
