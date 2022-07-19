import React, { useState, useEffect } from "react";
import {
  useCheatDispatch,
  useCheatState,
  startNewGame,
  getMatches,
  buildInitialInput,
  CHEAT_ACTIONS
} from "./cheatContext";
import MatchingGuesses from "./MatchingGuesses";
import DebugMode from "./DebugMode";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";
import SelectableLetters from "./SelectableLetters";

const Game = () => {
  const gameState = useCheatState();
  const cheatDispatch = useCheatDispatch();
  const [guess, setGuess] = useState(gameState.inputText);
  const [errorMessage, setErrorMessage] = useState(null);
  const defaultGuess = buildInitialInput(gameState.numLetters);
  const defaultGuessAsWord = buildInitialInput(gameState.numLetters).join("");
  const [shouldShowMessage, setShouldShowMessage] = useState(true);

  useEffect(() => {
    setGuess(gameState.inputText);
  }, [gameState.inputText]);

  const getValue = (index) => {
    return guess[index] || "";
  };

  const handleReset = () => {
    cheatDispatch({
      type: CHEAT_ACTIONS.NEW_CHEAT_WITH_LETTER_CHANGE,
      payload: { numLetters: gameState.numLetters },
    });
  }

  const handleGuessInput = (event, index) => {
    const getValue = () => {
      let value = event.target.value;
      if (value.length > 1) {
        value = value[value.length - 1];
      }
      return value;
    };

    setErrorMessage(null);

    const value = getValue();

    const newGuess = JSON.parse(JSON.stringify(guess));

    newGuess[index] = value;
    setGuess(newGuess);

    if (!value.length) {
      return;
    }

    const form = event.target.form;
    form.elements[index + 1].focus();
  };

  useEffect(() => {
    if (!gameState.inputText) {
      startNewGame(cheatDispatch);
    }
  }, []);

  const renderInputBoxes = () =>
    Object.keys(gameState.inputText).map((item, index) => (
      <span key={index}>
        <input
          value={getValue(index)}
          onChange={(event) => handleGuessInput(event, index)}
          className="letterInput"
        />
      </span>
    ));

  const handleSubmitGuess = async (event) => {
    event.preventDefault();
    /* Convert guess dict to an array, lowercase conversion is important! */
    const guessAsArray = Object.keys(guess).map((key) =>
      guess[key].toLowerCase()
    );
    const guessAsWord = guessAsArray.join("").toLowerCase();

    if (guessAsArray.length < gameState.numLetters) {
      setErrorMessage(`"${guessAsWord}" does not have enough numbers.`);
      return;
    }

    if (guessAsWord === defaultGuessAsWord && gameState.includedLetters.length === 0 && gameState.excludedLetters.length === 0) {
      setErrorMessage(
        `"${guessAsWord}" is invalid. Please enter at least one guess letter or select some letters to include or exclude.`
      );
      return;
    }

    const inputTestRegexString = `[a-zA-Z.]{${gameState.numLetters}}`;
    const inputTest = new RegExp(inputTestRegexString);
    if (!inputTest.test(guessAsWord)) {
      setErrorMessage(`"${guessAsWord}" has invalid characters.`);
      return;
    }

    await getMatches(cheatDispatch, gameState, guessAsWord);
  };

  return (
    <>
      <Header />
      <div className="ui main container">
        <div className="ui stackable grid">
          <div className="ui centered wide column">
            {shouldShowMessage && (
              <Message setShouldShowMessage={setShouldShowMessage} />
            )}
          </div>
        </div>
        <div className="ui stackable grid">
          <div className="ui centered four wide column">
            <div className="ui center aligned container">
              <SelectableLetters />
            </div>
          </div>
          <div className="ui centered twelve wide column">
            <div className="ui center aligned container">
              <div className="ui hidden divider"></div>
              <p>Select letters once you know their position.</p>
              <div>{renderInputBoxes()}</div>
              <div className="ui hidden divider"></div>
              {errorMessage && (
                <>
                  <div className="ui red message" role="alert">
                    <h2 className="ui header">Error</h2>
                    <p>{errorMessage}</p>
                  </div>
                  <div className="ui hidden divider"></div>
                </>
              )}
              <div className="btnFooter">
                <button
                  onClick={handleSubmitGuess}
                  type="submit"
                  className={`ui button green ${gameState.loading ? "loading" : ""}`}
                >
                  Get Matches
                </button>
                <button
                  className={`ui negative button + ${
                    gameState.loading ? "disabled" : ""
                  }`}
                  onClick={handleReset}
                  disabled={gameState.loading}
                >
                  Reset
                </button>
              </div>
              <div className="ui hidden divider"></div>
              {gameState.guessHasBeenMade && <MatchingGuesses />}
              <div className="ui hidden divider"></div>
              <DebugMode />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Game;
