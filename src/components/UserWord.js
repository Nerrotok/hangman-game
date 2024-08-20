// The component for the user's word that is displayed in underscores and letters
import React from "react";

function UserWord({ userLetterObjectArray }) {
  return (
    <div className="UserWord--container">
      {userLetterObjectArray.map((letterObject, index) => (
        <span className="userWord--letter" key={index}>
          {letterObject.enteredStatus ? letterObject.letterSymbol : "_"}
        </span>
      ))}
    </div>
  );
}

export default UserWord;
