import React, { useState, useEffect } from "react";
import {
  useCheatDispatch,
  useCheatState,
  startNewGame,
  getGuesses,
  buildInitialInput,
} from "./cheatContext";
import MatchingGuesses from "./MatchingGuesses";
import DebugMode from "./DebugMode";
import Header from "./Header";
import Footer from "./Footer";

const Game = () => {
  const gameState = useCheatState();
  const cheatDispatch = useCheatDispatch();
  const [guess, setGuess] = useState(gameState.inputText);
  const [errorMessage, setErrorMessage] = useState(null);
  const defaultGuess = buildInitialInput(gameState.numLetters);
  const defaultGuessAsWord = buildInitialInput(gameState.numLetters).join("");

  useEffect(() => {
    setGuess(gameState.inputText);
  }, [gameState.inputText]);

  const getValue = (index) => {
    return guess[index] || "";
  };

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

    if (guessAsWord == defaultGuessAsWord) {
      setErrorMessage(
        `"${guessAsWord}" is invalid. Please enter at least one letter.`
      );
      return;
    }

    const inputTestRegexString = `[a-zA-Z.]{${gameState.numLetters}}`;
    const inputTest = new RegExp(inputTestRegexString);
    if (!inputTest.test(guessAsWord)) {
      setErrorMessage(`"${guessAsWord}" has invalid characters.`);
      return;
    }

    await getGuesses(cheatDispatch, guessAsWord, gameState.numLetters);
  };

  return (
    <>
      <Header />
      <div className="ui main container">
        <div className="ui stackable grid">
          <div className="ui centered 8 wide column">
            <div className="ui center aligned container">
              <div
                className="ui green message"
                role="alert"
                style={{ margin: "0px auto", width: "75%" }}
              >
                <h2 class="ui header">Word Game Cheater </h2>
                <h3 style={{ marginTop: "-2px", fontStyle: "italic" }}>
                  Where you can cheat at Word Game Clone!
                </h3>
                <h4>How to use:</h4>
                <div
                  style={{
                    margin: "0px auto",
                    width: "75%",
                    textAlign: "left",
                  }}
                >
                  <ol>
                    <li>
                      <strong>Start a Word Game</strong> - I recommend{" "}
                      <a
                        href="https://christinabranson.github.io/word-game-clone/"
                        target="_blank"
                      >
                        <strong>Word Game Clone</strong>
                      </a>{" "}
                      because you can play over and over, but I guess the{" "}
                      <i>other</i> one is good, too.
                    </li>
                    <li>
                      <strong>
                        Play until you have some letters in the correct spots
                      </strong>{" "}
                      - Generally they show up as <strong>green</strong>.{" "}
                    </li>
                    <li>
                      <strong>
                        Note the number of letters in the game and the
                        letters/positions that you know
                      </strong>{" "}
                      - Use the dropdown in the header to change the letters you
                      can enter.
                    </li>
                    <li>
                      <strong>
                        On the cheat tool (HERE!) enter in what you know
                      </strong>{" "}
                      - Make sure that letters you know (<strong>green</strong>{" "}
                      in most games) are in the correct positions.{" "}
                    </li>
                    <li>
                      <strong>Use a period (.) for unknowns</strong> - This is
                      super important!{" "}
                    </li>
                    <li>
                      <strong>
                        At least one real letter (not a period) must be provided
                      </strong>{" "}
                      - This is also important!{" "}
                    </li>
                    <li>
                      <strong>Only use letters or periods</strong> - Or you will
                      get yelled at!{" "}
                    </li>
                    <li>
                      <strong>The more letters you have</strong> the better your
                      results will be, so keep guessing if the list is too
                      large!{" "}
                    </li>
                  </ol>
                </div>
              </div>
              <div className="ui hidden divider"></div>
              <div>{renderInputBoxes()}</div>
              <div className="ui hidden divider"></div>
              {errorMessage && (
                <>
                  <div className="ui red message" role="alert">
                    <h2 class="ui header">Error</h2>
                    <p>{errorMessage}</p>
                  </div>
                  <div className="ui hidden divider"></div>
                </>
              )}
              <div className="btnFooter">
                <button
                  onClick={handleSubmitGuess}
                  type="submit"
                  className="ui button green"
                >
                  Get Matches
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
