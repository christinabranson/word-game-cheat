import React, { useState, useEffect } from "react";
import { useCheatDispatch, useCheatState, CHEAT_ACTIONS } from "./cheatContext";

const SelectableLetters = ({}) => {
  const gameState = useCheatState();
  const cheatDispatch = useCheatDispatch();
  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const isLetterIncluded = (letter) =>
    gameState.includedLetters.includes(letter);
  const isLetterExcluded = (letter) =>
    gameState.excludedLetters.includes(letter);

  return (
    <>
      <div className="ui hidden divider"></div>
      <p>
        Select letters that you know are included or excluded, even if you don't
        know their positions.
      </p>
      <div className="ui hidden divider"></div>
      {alphabet.map((item) => {
        const index = `selectable-${item}`;
        const isExcluded = isLetterExcluded(item);
        const isIncluded = isLetterIncluded(item);
        const isNone = !isExcluded && !isIncluded;

        let className = "letterInput";
        if (isExcluded) {
          className += " inputIndexExclude";
        } else if (isIncluded) {
          className += " inputIndexInWord";
        }

        const updateLetterState = (letter) => {
          if (isNone) {
            cheatDispatch({
              type: CHEAT_ACTIONS.ADD_EXCLUDED_LETTER,
              payload: {
                letter: letter,
              },
            });
          } else if (isExcluded) {
            cheatDispatch({
              type: CHEAT_ACTIONS.ADD_INCLUDED_LETTER,
              payload: {
                letter: letter,
              },
            });
          } else {
            cheatDispatch({
              type: CHEAT_ACTIONS.ADD_NONE_LETTER,
              payload: {
                letter: letter,
              },
            });
          }
        };

        return (
          <span key={index}>
            <input
              value={item}
              onClick={() => updateLetterState(item)}
              className={className}
              readOnly
            />
          </span>
        );
      })}
    </>
  );
};

export default SelectableLetters;
