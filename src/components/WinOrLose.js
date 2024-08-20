// Component which displays whether the user has won or lost the game
function WinOrLose({ winLoseMessage, gameOver, hangmanLetterObjectArray }) {
  // Win lose state update
  if (gameOver && winLoseMessage === "Unfortunately, you lost D:") {
    return (
      <div className="WinOrLose--container">
        {winLoseMessage}
        <div className="WinOrLose--word">
          The word was:{" "}
          {hangmanLetterObjectArray.map((letterObject, index) => (
            <span key={index}>{letterObject.letterSymbol}</span>
          ))}
        </div>
      </div>
    );
  } else if (gameOver) {
    return <div className="WinOrLose--container">{winLoseMessage}</div>;
  }
}

export default WinOrLose;
