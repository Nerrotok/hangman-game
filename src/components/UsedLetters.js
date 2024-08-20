// Component which shows letters that have been used
import React from "react";

function UsedLetters({ lettersEntered }) {
  let lettersArray = lettersEntered.split("");

  return (
    <div className="UsedLetters--container">
      {lettersArray.map((letter, index) => (
        <span className="UsedLetters--letter" key={index}>
          {letter}
        </span>
      ))}
    </div>
  );
}

export default UsedLetters;
