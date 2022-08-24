import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
import { firebaseDB } from "fbInstance";
import React, { useState, useEffect } from "react";
const Home = ({ userObj }) => {

    const [nweets, setNweets] = useState([]);

    useEffect(() => {
        firebaseDB.onSnapshot(firebaseDB.collection(firebaseDB.getFirestore(), "nweets"), (snapshot) => {
            const array = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            setNweets(array);
        }) 
    }, []);

    return (
        <div className="container"> 
            <NweetFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
                {nweets.map(nweet => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={ nweet.creatorId === userObj.uid } />
                ))}
            </div>
        </div>
    )
}

export default Home;
