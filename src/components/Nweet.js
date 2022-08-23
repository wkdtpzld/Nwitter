import React from "react";

function Nweet({ nweetObj, isOwner }) {

    return (
        <div>
            <h4>{nweetObj.text}</h4>
            {isOwner && (
                <>
                    <button>Delete btn</button>
                    <button>Edit btn</button>
                </>
            )}
        </div>
    )
    
}

export default Nweet