import React, { useState } from "react";
import { authService } from "../fbInstance";

function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAcount] = useState(true);
    const [error, setError] = useState("");

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const onPWChange = (event) => {
        setPassword(event.target.value);
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        let data;
        try {
            if (newAccount) {
                data = await authService.createUserWithEmailAndPassword(
                    authService.getAuth(), email, password
                );
            } else if (!newAccount) {
                data = await authService.signInWithEmailAndPassword(
                    authService.getAuth(), email, password
                );
            }
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    }

    const toggleAccount = () => setNewAcount((current) => !current);
    const onSocialClick = async(event) => {
        const {
            target: { name }
        } = event;

        let provider;

        if (name === "google") {
            provider = new authService.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new authService.GithubAuthProvider();
        }
        await authService.signInWithPopup(authService.getAuth(), provider);
    } 


    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Email" value={email} onChange={onEmailChange} required />
                <input type="password" placeholder="Password" value={password} onChange={onPWChange} required />
                <input type="submit" value={newAccount ? "Create New Account" : "Log In"} />
            </form>

            <span onClick={toggleAccount}>{newAccount ? "Log In" : "CreateAccount"}</span>
            <span>{error}</span>
            <div>
                <button name="google" onClick={onSocialClick}>Continue With Google</button>
                <button name="github" onClick={onSocialClick}>Continue With Github</button>
            </div>
        </div>
    )
    
}

export default Auth;