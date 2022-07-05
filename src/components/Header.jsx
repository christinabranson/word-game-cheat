import React from "react";
import {
  useGameState,
  useGameDispatch,
  startNewGame,
  changeLetterCount,
  VALID_NUM_LETTERS,
} from "./gameContext";

const Header = () => {
  const gameState = useGameState();
  const gameDispatch = useGameDispatch();

  const handleChangeNumLetters = (numLetters) => {
    if (numLetters !== gameState.numLetters) {
      changeLetterCount(gameDispatch, numLetters);
    }
  };

  const renderNumberOfLettersOptions = () =>
    VALID_NUM_LETTERS.map((item) => (
      <div
        className={`${gameState.numLetters === item ? "disabled" : ""} item`}
        key={item}
        onClick={() => handleChangeNumLetters(item)}
        disabled={gameState.numLetters === item}
      >
        {item} letters
      </div>
    ));

  const handleStartNewGameClick = () => {
    startNewGame(gameDispatch, gameState.numLetters);
  };
  return (
    <div className="ui fixed inverted menu">
      <div className="ui container">
        <div className="header item">Word Game Clone</div>
        <a onClick={handleStartNewGameClick} className="item">
          New Game
        </a>
      </div>

      <div>
        <div className="ui compact menu inverted">
          <div className="ui simple dropdown item">
            <strong>{gameState.numLetters} letters</strong>
            <i className="dropdown icon"></i>
            <div className="menu">{renderNumberOfLettersOptions()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
