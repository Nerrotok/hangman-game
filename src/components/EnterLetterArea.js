// Component for user to enter letters into
import React, { useState } from "react";

function EnterLetterArea({
  userLetterObjectArray,
  updateLettersEntered,
  lettersEntered,
  updateLetterObjectStatus,
  updateHangmanCounter,
  gameOver,
}) {
  const [inputValue, setInputValue] = useState("");

  const letterInputHandler = (e) => {
    let letter = e.target.value;

    // Do nothing if the input is blank
    if (letter !== " " && letter !== "") {
      // Check that input is a letter
      if (letter.match(/^[a-zA-Z]$/)) {
        letter = letter.toLowerCase();

        // Check if it has been entered before
        if (lettersEntered.includes(letter)) {
          alert(`You have already entered ${letter}`);
        } else {
          // If the letter is new
          updateLettersEntered(letter);

          // Update letter object if the letter is in the word
          if (!updateLetterObjectStatus(letter)) {
            // if not updated, advance hangman counter to death
            updateHangmanCounter();
          }
        }

        // Clear input field
        setInputValue("");
      } else {
        // Message if the character is not valid
        alert(`${letter} is not a valid character, please only enter letters.`);
        // Clear input field
        setInputValue("");
      }
    }
  };

  if (!gameOver) {
    return (
      <div className="EnterLetterArea--container">
        <h3>Enter a Letter</h3>

        <input
          type="text"
          name="letterInput"
          maxLength="1"
          pattern="[a-z]+"
          value={inputValue}
          onChange={letterInputHandler}
        />
      </div>
    );
  }
}

export default EnterLetterArea;
