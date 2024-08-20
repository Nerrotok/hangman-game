// Component for the visual representation of the hangman
import hangmanOne from "../images/state1.GIF";
import hangmanTwo from "../images/state2.GIF";
import hangmanThree from "../images/state3.GIF";
import hangmanFour from "../images/state4.GIF";
import hangmanFive from "../images/state5.GIF";
import hangmanSix from "../images/state6.GIF";
import hangmanSeven from "../images/state7.GIF";
import hangmanEight from "../images/state8.GIF";
import hangmanNine from "../images/state9.GIF";
import hangmanTen from "../images/state10.gif";
import hangmanEleven from "../images/state11.GIF";

function HangmanMan({ hangmanCounter }) {
  // make an array of the hangman states
  const hangmanStates = [
    hangmanOne,
    hangmanTwo,
    hangmanThree,
    hangmanFour,
    hangmanFive,
    hangmanSix,
    hangmanSeven,
    hangmanEight,
    hangmanNine,
    hangmanTen,
    hangmanEleven,
  ];

  return (
    <div className="hangman--container">
      <img
        className="hangman--image"
        src={hangmanStates[hangmanCounter]}
        alt="Hangman"
      />
    </div>
  );
}

export default HangmanMan;
