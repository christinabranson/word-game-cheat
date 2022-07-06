import React from "react";
import { useCheatState } from "./cheatContext";

const DEBUG_MODE = process.env.NODE_ENV === "development";

const COLORS = [
  ["#f6e58d", "#f9ca24"],
  ["#ffbe76", "#f0932b"],
  ["#badc58", "#6ab04c"],
]

const Guess = ({ match, index }) => {

  const color = COLORS[index % 3];

  const style = {
    backgroundColor: color[0],
    boxShadow: `3px 3px ${color[1]}`,
  }

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

  const renderGuesses = () =>
    matches.map((item, index) => (
      <div key={index}>
        <Guess match={item} index={index} />
      </div>
    ));

  return (
  <>
    <p>We have <strong>{matches.length} match(es)!</strong> Adding more letters will help narrow this down.</p>
    {renderGuesses()}
  </>
  );
};

export default MatchingGuesses;
