import "./App.css";
import React, { useEffect } from "react";
import dictionaryText from "./words/dictionary.txt";
import UserWord from "./components/UserWord";
import EnterLetterArea from "./components/EnterLetterArea";
import UsedLetters from "./components/UsedLetters";
import HangmanMan from "./components/HangmanMan";
import WinOrLose from "./components/WinOrLose";
import Restart from "./components/Restart";
import Help from "./components/Help";

function App() {
  // Set up state
  // The word being used for hangman
  const [hangmanLetterObjectArray, setHangmanLetterObjectArray] =
    React.useState([]);

  // String of letters used
  const [lettersEntered, setLettersUsed] = React.useState("");

  // Keep track of incorrect guesses
  // 10 guess = loss
  const [hangmanCounter, setHangmanCounter] = React.useState(0);

  // Game over state
  const [gameOver, setGameOver] = React.useState(false);

  // Prevent premature game ends
  const [gameStarted, setGameStarted] = React.useState(false);

  const [winLoseMessage, setWinLoseMessage] = React.useState("");
  // useEffect to set up game at start
  useEffect(() => {
    // Function for fetching and setting new word

    // Function called to set word
    fetchAndSetWord();
    // Makes this run once when app mounts
  }, []);

  // useEffect to track win or lose status
  useEffect(() => {
    // Handle pre-mature game ends
    if (gameStarted) {
      // Check if the hangman counter has reached 10
      if (hangmanCounter >= 10) {
        setGameOver(true);
        setWinLoseMessage("Unfortunately, you lost D:");
      } else {
        // Check that each letter's entered status is true
        let allLettersRevealed = true;

        for (let i = 0; i < hangmanLetterObjectArray.length; i++) {
          if (!hangmanLetterObjectArray[i].enteredStatus) {
            allLettersRevealed = false;
            break;
          }
        }

        if (allLettersRevealed) {
          setGameOver(true);
          setWinLoseMessage("Congratulations, you won :D");
        }
      }
    }
  }, [hangmanCounter, hangmanLetterObjectArray, gameStarted]);

  // Function to get a new word
  const fetchAndSetWord = () => {
    // Fetch request to get words from textfile
    fetch(dictionaryText)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error occured");
        }
        return response.text();
      })
      .then((data) => {
        // Convert data into an array
        const dictionaryArray = data

          // Each word is from a new line
          .split("\n")

          // Any trailing space is removed
          .map((word) => word.trim())

          // Possible empty lines, single letters, and Proper nouns not included
          .filter((word) => word.length > 1 && /^[a-z]/.test(word));

        // Get a word randomly from the list
        let wordIndex = Math.floor(Math.random() * dictionaryArray.length);
        let hangmanWord = dictionaryArray[wordIndex];
        let hangmanWordArray = hangmanWord.split("");
        let hangmanLetterObjectArray = [];

        for (let i = 0; i < hangmanWordArray.length; i++) {
          let letterObject = {
            letterSymbol: hangmanWordArray[i],
            enteredStatus: false,
          };

          // Account for compund words
          if (letterObject.letterSymbol === "-") {
            letterObject.enteredStatus = true;
          }

          hangmanLetterObjectArray.push(letterObject);
        }

        // Set to App component state
        setHangmanLetterObjectArray(hangmanLetterObjectArray);
      })
      .catch((error) => {
        console.error("Error getting dictionay:", error);
      });
  };
  // Update letters used function
  const updateLettersEntered = (letter) => {
    setLettersUsed((prevLetters) => prevLetters + letter);

    // set game to start when letters are changed
    setGameStarted(true);
  };

  // Function to update letterObjects
  const updateLetterObjectStatus = (letter) => {
    let letterFound = false;
    let updatedArray = [];

    for (let i = 0; i < hangmanLetterObjectArray.length; i++) {
      // If the letter matches the symbol
      if (hangmanLetterObjectArray[i].letterSymbol === letter) {
        let updateLetter = hangmanLetterObjectArray[i];

        updateLetter.enteredStatus = true;
        updatedArray.push(updateLetter);
        letterFound = true;

        // If the letter does not match the symbol
      } else {
        updatedArray.push(hangmanLetterObjectArray[i]);
      }
    }

    setHangmanLetterObjectArray(updatedArray);
    // Case for no letter being updated
    if (letterFound === false) {
      return false;
    } else {
      // Case for letters being updated
      return true;
    }
  };

  // Function to update counter to hangman's death
  const updateHangmanCounter = () => {
    setHangmanCounter((prevCounter) => prevCounter + 1);
  };

  // Reset functions
  // Reset counter
  const resetHangmanCounter = () => {
    setHangmanCounter(0);
  };

  // Reset game over
  const resetGameOver = () => {
    setGameOver(false);
  };

  // Reset game start
  const resetGameStart = () => {
    setGameStarted(false);
  };

  // Reset letters entered
  const resetLettersEntered = () => {
    setLettersUsed("");
  };

  // App renders

  console.log(hangmanCounter);
  return (
    <div className="app--container">
      <div className="container--row">
        <div className="container--column">
          <h1 className="app--title">Hangman</h1>
          <HangmanMan hangmanCounter={hangmanCounter} />
          <WinOrLose
            winLoseMessage={winLoseMessage}
            gameOver={gameOver}
            hangmanLetterObjectArray={hangmanLetterObjectArray}
          />
          <div className="container--row">
            <Restart
              resetHangmanCounter={resetHangmanCounter}
              fetchAndSetWord={fetchAndSetWord}
              resetGameOver={resetGameOver}
              resetGameStart={resetGameStart}
              resetLettersEntered={resetLettersEntered}
            />
          </div>
        </div>
        <div className="container--column">
          <UserWord userLetterObjectArray={hangmanLetterObjectArray} />
          <EnterLetterArea
            gameOver={gameOver}
            userLetterObjectArray={hangmanLetterObjectArray}
            updateLettersEntered={updateLettersEntered}
            lettersEntered={lettersEntered}
            updateLetterObjectStatus={updateLetterObjectStatus}
            updateHangmanCounter={updateHangmanCounter}
          />
        </div>

        <UsedLetters lettersEntered={lettersEntered} />
      </div>
      <Help />
    </div>
  );
}

export default App;
