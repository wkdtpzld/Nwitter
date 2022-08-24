import React, { useEffect, useState } from "react";
import { authService, firebaseDB } from "../fbInstance";

function Profile({userObj, refreshUser}) {
    
    const [newDisplay, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClick = () => {
        authService.signOut(authService.getAuth());
    }

    const getMyNweets = async() => {
        const nweets = await firebaseDB.query(firebaseDB.collection(firebaseDB.getFirestore(), "nweets"),
            firebaseDB.where("creatorId", "==", userObj.uid),
            firebaseDB.orderBy("createAt", "asc"));

        const querySnapshot = await firebaseDB.getDocs(nweets);

        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
        })
    }

    const onSubmit = async(evnet) => {
        evnet.preventDefault();
        if (userObj.displayName !== newDisplay) {
            await authService.updateProfile(authService.getAuth().currentUser, {
                displayName: newDisplay
            });
            refreshUser();
        }
    }

    const onChange = (evnet) => {
        const {
            target: {value}
        } = evnet;

        setNewDisplayName(value);
    }

    useEffect(() => {
        getMyNweets();
    });

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Display Name" onChange={onChange} value={newDisplay} />
                <input type="submit" value="Update Profile" />
            </form>
            <h1>Profile</h1>
            <button onClick={onLogOutClick}>Logout</button>
        </div>
    )
}

export default Profile;
