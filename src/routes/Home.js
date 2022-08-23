import Nweet from "components/Nweet";
import { firebaseDB } from "fbInstance";
import React, { useState, useEffect } from "react";

const Home = ({ userObj }) => {

    const [nweet, setNweet] = useState("");
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

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            await firebaseDB.addDoc(firebaseDB.collection(firebaseDB.getFirestore(), "nweets"), {
                text: nweet,
                createAt: Date.now(),
                creatorId: userObj.uid
            });
            setNweet("");
        } catch (error) {
            console.log(error.message);
        }
    };

    const onChange = (event) => {
        const {
            target: { value }
        } = event;

        setNweet(value);
    }

    return (
        <> 
            <form onSubmit={ onSubmit }>
                <input type="text" placeholder="What`s on your mind?" maxLength={120} value={nweet} onChange={onChange} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map(nweet => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={ nweet.creatorId === userObj.uid } />
                ))}
            </div>
        </>
    )
}

export default Home;
