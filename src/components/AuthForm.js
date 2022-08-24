import React, { useState } from "react";
import { authService } from "../fbInstance";

function AuthForm() {

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

    return (
        <div>
            <form onSubmit={onSubmit} className="container">
                <input type="text" placeholder="Email" value={email} onChange={onEmailChange} className="authInput" required />
                <input type="password" placeholder="Password" value={password} onChange={onPWChange} required className="authInput" />
                <input type="submit" value={newAccount ? "Create New Account" : "Log In"} className="authInput authSubmit" />
                {error && <span className="authError">{ error }</span>}
            </form>

            <span onClick={toggleAccount} className="authSwitch" >{newAccount ? "Log In" : "CreateAccount"}</span>

        </div>
    )
    
}

export default AuthForm;