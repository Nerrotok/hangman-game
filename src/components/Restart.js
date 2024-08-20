// Component for a button that restarts the game
function Restart({
  resetGameOver,
  resetGameStart,
  fetchAndSetWord,
  resetHangmanCounter,
  resetLettersEntered,
}) {
  const restartGame = (e) => {
    resetGameOver();
    resetGameStart();
    fetchAndSetWord();
    resetHangmanCounter();
    resetLettersEntered();
  };

  return (
    <button className="Restart--button" onClick={restartGame}>
      Restart Game
    </button>
  );
}

export default Restart;
