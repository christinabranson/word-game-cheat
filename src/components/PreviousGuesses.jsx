import React from "react";
import { useGameState } from "./gameContext";

const CLASS_INDEX_MATCH = "inputIndexMatch";
const CLASS_INDEX_IN_WORD = "inputIndexInWord";
const CLASS_INDEX_NONE = "inputIndexNone";

const DEBUG_MODE = process.env.NODE_ENV === "development";

export const makeLowercased = (wordList) =>
  wordList.map((item) => item.toLowerCase());

export const getGuessAnalysis = (guess, word) => {
  const loweredGuess = makeLowercased(guess);
  const loweredWordList = makeLowercased(word.split(""));
  const remainingLettersInWord = loweredWordList.map((item, index) => {
    if (item === loweredGuess[index]) {
      return null;
    }
    return item;
  });

  if (DEBUG_MODE) {
    console.log(`guess:\t\t${loweredGuess.join("")}`);
    console.log(`word:\t\t${loweredWordList.join("")}`);
    console.log(`remaining:\t${remainingLettersInWord.join("")}`);
  }

  const analysis = [];
  loweredGuess.map((guessLetter, index) => {
    let letterClass = CLASS_INDEX_NONE;

    if (loweredWordList[index] === guessLetter) {
      letterClass = CLASS_INDEX_MATCH;
    } else {
      const letterIndex = remainingLettersInWord.indexOf(guessLetter);
      if (letterIndex > -1) {
        letterClass = CLASS_INDEX_IN_WORD;
        remainingLettersInWord[letterIndex] = null;

        if (DEBUG_MODE) {
          console.log(
            `remaining:\t${remainingLettersInWord.join("")}\t\t(${guessLetter} removed)`
          );
        }
      }
    }

    const guessLetterAnalysis = {
      value: guessLetter,
      class: letterClass,
    };
    analysis.push(guessLetterAnalysis);
  });

  return analysis;
};

const Guess = ({ guess }) => {
  const gameState = useGameState();
  const word = gameState.word;
  const guessAnalysis = getGuessAnalysis(guess, word);

  const renderInputBoxes = () =>
    guessAnalysis.map((item, index) => (
      <span key={index}>
        <input
          value={item.value}
          className={`letterInput ` + item.class}
          disabled
        />
      </span>
    ));

  return <>{renderInputBoxes()}</>;
};

const PreviousGuesses = () => {
  const gameState = useGameState();
  const guesses = gameState.guesses;

  const renderGuesses = () =>
    guesses.map((item, index) => (
      <div key={index}>
        <Guess guess={item} />
      </div>
    ));

  return <>{renderGuesses()}</>;
};

export default PreviousGuesses;
