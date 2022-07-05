import React, { useState, useEffect } from "react";
import {
  useGameDispatch,
  useGameState,
  resumeSessionOrNewGame,
  startNewGame,
  GAME_ACTIONS,
} from "./gameContext";
import NewGuess from "./NewGuess";
import PreviousGuesses from "./PreviousGuesses";
import DebugMode from "./DebugMode";
import Instructions from "./Instructions";
import Header from "./Header";
import Footer from "./Footer";

const Game = () => {
  const gameState = useGameState();
  const gameDispatch = useGameDispatch();
  const isInputEnabled = !gameState.shouldRevealWord && !gameState.isGameWon;

  useEffect(() => {
    if (!gameState.word) {
      resumeSessionOrNewGame(gameDispatch);
    }
  }, []);

  const handleStartNewGameClick = () => {
    startNewGame(gameDispatch, gameState.numLetters);
  };

  const handleRevealWord = () => {
    if (isInputEnabled) {
      gameDispatch({ type: GAME_ACTIONS.GIVE_UP });
    }
  };

  const renderRevealWord = () => {
    if (gameState.shouldRevealWord) {
      return (
        <div className="ui red message" role="alert">
          You have failed. Your word was <strong>{gameState.word}</strong>
          <div className="ui hidden divider"></div>
          <button
            onClick={handleStartNewGameClick}
            type="button"
            className="ui button secondary"
          >
            New game
          </button>
        </div>
      );
    }
    return null;
  };

  const renderGameWonBanner = () => {
    if (gameState.isGameWon) {
      return (
        <div className="ui green message" role="alert">
          <h2 class="ui header">You won!</h2>
          <p>No need to wait, try playing another game!</p>
          <p>Too easy?<br/> Use the dropdown in the header to increase the number of letters.</p>
          <button
            onClick={handleStartNewGameClick}
            type="button"
            className="ui button secondary"
          >
            New game
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <Header />
      <div className="ui main container">
        <div className="ui stackable grid">
          <div className="ui ten wide column">
            <div className="ui center aligned container">
              <div className="ui hidden divider"></div>
              {renderGameWonBanner()}
              {renderRevealWord()}
              <PreviousGuesses />
              {isInputEnabled && (
                <>
                  <NewGuess />
                </>
              )}
            </div>
          </div>
          <div className="ui six wide column">
            <div className="ui center aligned container">
              <div className="ui hidden divider"></div>

              <div className="ui buttons">
                <button
                  className="ui positive button"
                  onClick={handleStartNewGameClick}
                >
                  New game
                </button>
                <div className="or"></div>
                <button
                  className={`ui negative button + ${
                    !isInputEnabled ? "disabled" : ""
                  }`}
                  onClick={handleRevealWord}
                  disabled={!isInputEnabled}
                >
                  Give up
                </button>
              </div>
            </div>
            <div className="ui hidden divider"></div>

            <Instructions />

            <div className="ui hidden divider"></div>

            <DebugMode />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Game;
