import React from "react";
import { useCheatState } from "./cheatContext";

const DEBUG_MODE = process.env.NODE_ENV === "development";

const COLORS = [
  ["#badc58", "#6ab04c"],
  ["#7ed6df", "#22a6b3"],
  ["#e056fd", "#be2edd"],
];

const Guess = ({ match, index }) => {
  const color = COLORS[index % 3];

  const style = {
    backgroundColor: color[0],
    boxShadow: `3px 3px ${color[1]}`,
  };

  const renderInputBoxes = () =>
    match.map((item, index) => (
      <span key={index}>
        <input value={item} className={`letterInput `} style={style} disabled />
      </span>
    ));

  return <>{renderInputBoxes()}</>;
};

const MatchingGuesses = () => {
  const gameState = useCheatState();
  const matches = gameState.matchingWords;

  const renderGuesses = () => {
    if (matches.length === 0) {
      return null;
    }

    return matches.map((item, index) => (
      <div key={index}>
        <Guess match={item} index={index} />
      </div>
    ));
  };

  return (
    <>
      <p>
        We have <strong>{matches.length} match(es)!</strong> Adding more letters
        will help narrow this down.
      </p>
      {renderGuesses()}
    </>
  );
};

export default MatchingGuesses;
