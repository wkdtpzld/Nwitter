import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"
import { firebaseDB, storageService } from "fbInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

function NweetFactory({ userObj }) {

    const [attachment, setAttachment] = useState("");
    const [nweet, setNweet] = useState("");

    const onSubmit = async (event) => {
        if (nweet === "") {
            return;
        }
        
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
        setAttachment("");
    }


    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input type="text" placeholder="What`s on your mind?" maxLength={120} value={nweet} onChange={onChange} className="factoryInput__input" />
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input id="attach-file" type="file" accept="image/*" onChange={onFileChange}
                style={{
                opacity: 0,
                }}
            />
            {attachment && (
                <div className="factoryForm__attachment">
                    <img src={attachment} alt={nweet.id}
                        style={{
                            backgroundImage: attachment,
                        }} />
                    <div className="factoryForm__clear" onClick={onClearAttachmentClick} >
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
                
            )}
            
        </form>
    )
}

export default NweetFactory