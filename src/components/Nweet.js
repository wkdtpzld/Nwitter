import { firebaseDB, storageService } from "fbInstance";
import React, { useState } from "react";

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
      <div>
        {isEditing ? (
          <form onSubmit={onSubmit}>
            <input type="text" value={newNweet} onChange={onChange} required />
            <input type="submit" value="Update" />
          </form>
        ) : (
          <>
            <h4>{nweetObj.text}</h4>
            {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="50px" height="50px" alt="temp"/>}
            {isOwner && (
              <>
                <button onClick={onDeleteClick}>Delete btn</button>
                <button onClick={toggleEditing}>Edit btn</button>
              </>
            )}
          </>
        )}
      </div>
    );
    
}

export default Nweet