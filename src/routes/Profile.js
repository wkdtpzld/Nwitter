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
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input type="text" placeholder="Display Name" onChange={onChange} value={newDisplay} className="formInput" autoFocus />
                <input type="submit" value="Update Profile" className="formBtn" style={{ marginTop: 10 }}/>
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>
        </div>
    )
}

export default Profile;
