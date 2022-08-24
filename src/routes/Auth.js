import AuthForm from "components/AuthForm";
import React from "react";
import { authService } from "../fbInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faGoogle,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";

function Auth() {

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
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{ marginBottom: 30 }}
            />
            <AuthForm />
            <div className="authBtns">
                <button name="google" onClick={onSocialClick} className="authBtn">
                    Continue With Google
                    <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button name="github" onClick={onSocialClick} className="authBtn">
                    Continue With Github
                    <FontAwesomeIcon icon={faGithub} />
                </button>
            </div>
        </div>
    )
    
}

export default Auth;