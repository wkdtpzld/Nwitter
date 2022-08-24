import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {

    return (
        <Router basename={process.env.PUBLIC_URL}>
            {isLoggedIn && <Navigation userObj={ userObj } />}
            
                {isLoggedIn ? (
                <div style={{
                    maxWidth: 890,
                    width: "100%",
                    margin: "0 auto",
                    marginTop: 80,
                    display: "flex",
                    justifyContent: "center",
                }}>
                    <Routes>
                        <Route path="/" element={<Home userObj={ userObj } />}></Route>
                        <Route path="/profile" element={<Profile userObj={ userObj } refreshUser={refreshUser} />}></Route>
                        <Route path="*" element={<Navigate to="/" />}></Route>
                    </Routes>
                </div>
                ) : (
                <div>
                    <Routes>
                        <Route path="/" element={<Auth />}></Route>
                        <Route path="*" element={<Navigate to="/" />}></Route>
                    </Routes>
                </div>
                )}
            
        </Router>
    );
};

export default AppRouter;