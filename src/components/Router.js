import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {

    return (
        <Router>
            {isLoggedIn && <Navigation userObj={ userObj } />}
            <Routes>
                {isLoggedIn ? (
                <>
                    <Route path="/" element={<Home userObj={ userObj } />}></Route>
                    <Route path="/profile" element={<Profile userObj={ userObj } refreshUser={refreshUser} />}></Route>
                    <Route path="*" element={<Navigate to="/" />}></Route>
                </>
                ) : (
                <>
                    <Route path="/" element={<Auth />}></Route>
                    <Route path="*" element={<Navigate to="/" />}></Route>
                </>
                )}
            </Routes>
        </Router>
    );
};

export default AppRouter;