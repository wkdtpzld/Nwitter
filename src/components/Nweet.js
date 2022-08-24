import { firebaseDB, storageService } from "fbInstance";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";


function Nweet({ nweetObj, isOwner }) {

    const [isEditing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);


    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this Nweets?");
        if (ok) {
            await firebaseDB.deleteDoc(firebaseDB.doc(firebaseDB.getFirestore(), "nweets", nweetObj.id));
            await storageService.deleteObject(storageService.ref(storageService.getStorage(), nweetObj.attachmentUrl));
        }
    }

    const toggleEditing = () => {
        setEditing((prev) => !prev);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        await firebaseDB.updateDoc(
            firebaseDB.doc(firebaseDB.getFirestore(), "nweets", nweetObj.id),
            {
                text: newNweet,
            }
        );

        setEditing((prev) => !prev);
    }

    const onChange = (event) => {
        const {
            target : { value }
        } = event;

        setNewNweet(value);
    }

    return (
        <div className="nweet">
            {isEditing ? (
                <>
                <form onSubmit={onSubmit} className="container nweetEdit">
                    <input type="text" value={newNweet} onChange={onChange} className="formInput" autoFocus required />
                    <input type="submit" value="Update Nweet" className="formBtn" />
                </form>
                <span onClick={toggleEditing} className="formBtn cancelBtn">
                    Cancel
                </span>
                </>
            ) : (
            <>
                <h4>{nweetObj.text}</h4>
                {nweetObj.attachmentUrl && (
                <img
                    src={nweetObj.attachmentUrl} alt={nweetObj.id} />
                )}
                {isOwner && (
                <div className="nweet__actions">
                    <span onClick={onDeleteClick}>
                        <FontAwesomeIcon icon={faTrash} />
                    </span>
                    <span onClick={toggleEditing}>
                        <FontAwesomeIcon icon={faPencilAlt} />
                    </span>
                </div>
                )}
            </>
            )}
        </div>
    );
    
}

export default Nweet