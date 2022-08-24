import Nweet from "components/Nweet";
import { firebaseDB, storageService } from "fbInstance";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"

const Home = ({ userObj }) => {

    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");

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

        let attachmentUrl = "";

        if (attachment !== "") {
            const storage = storageService.getStorage();
            const fileRef = storageService.ref(storage, `${userObj.uid}/${uuidv4()}`);
            const response = await storageService.uploadString(fileRef, attachment, "data_url");
            attachmentUrl = await storageService.getDownloadURL(response.ref);
        }
        
        try {
            await firebaseDB.addDoc(firebaseDB.collection(firebaseDB.getFirestore(), "nweets"), {
                text: nweet,
                createAt: Date.now(),
                creatorId: userObj.uid,
                attachmentUrl : attachmentUrl
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

    const onFileChange = (event) => {
        const {
            target: { files },
        } = event;

        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget : { result }
            } = finishedEvent

            setAttachment(result);
        }

        reader.readAsDataURL(theFile);
    }

    const onClearAttachmentClick = () => {
        setAttachment(null)
    }

    return (
        <> 
            <form onSubmit={ onSubmit }>
                <input type="text" placeholder="What`s on your mind?" maxLength={120} value={nweet} onChange={onChange} />
                <input type="file" accept="image/*" onChange={onFileChange} /> 
                <input type="submit" value="Nweet" />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" alt="temp"/>
                        <button onClick={onClearAttachmentClick}>Cancel upload</button>
                    </div>
                    
                )}
                
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
