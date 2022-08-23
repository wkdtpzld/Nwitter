import React from "react";
import { authService } from "../fbInstance";

function Profile() {
    
    const onLogOutClick = () => {
        authService.signOut(authService.getAuth());
    }
    return (
        <div>
            <h1>Profile</h1>
            <button onClick={onLogOutClick}>Logout</button>
        </div>
    )
}

export default Profile;
