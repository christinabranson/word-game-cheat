import { getMatchingWords } from "../../dictionary/handleWords";

export const CHEAT_ACTIONS = {
  NEW_CHEAT: "cheatContext/newCheat",
  NEW_CHEAT_WITH_LETTER_CHANGE: "cheatContext/newGameLetterChange",
  POPULATE_MATCHES: "cheatContext/populateMatches",
  ADD_INCLUDED_LETTER: "cheatContext/addIncludedLetter",
  ADD_EXCLUDED_LETTER: "cheatContext/addExcludedLetter",
  ADD_NONE_LETTER: "cheatContext/addNoneLetter",
  SET_LOADING: "cheatContext/setLoading",
};

export const VALID_NUM_LETTERS = [4, 5, 6, 7, 8, 9, 10];

export const startNewGame = async (cheatDispatch, numLetters = 5) => {
  cheatDispatch({
    type: CHEAT_ACTIONS.NEW_CHEAT_WITH_LETTER_CHANGE,
    payload: { numLetters: numLetters },
  });
};

export const changeLetterCount = async (cheatDispatch, numLetters = 5) => {
  cheatDispatch({
    type: CHEAT_ACTIONS.NEW_CHEAT_WITH_LETTER_CHANGE,
    payload: { numLetters: numLetters },
  });
};

export const getMatches = async (cheatDispatch, gameState, guessAsWord) => {

  cheatDispatch({
    type: CHEAT_ACTIONS.SET_LOADING,
    payload: {},
  });

  const guessAsRegex = new RegExp(guessAsWord);

  const matchingWords = await getMatchingWords(
    guessAsRegex,
    gameState.includedLetters,
    gameState.excludedLetters,
    gameState.numLetters,
    );

  cheatDispatch({
    type: CHEAT_ACTIONS.POPULATE_MATCHES,
    payload: { 
      numLetters: gameState.numLetters,
      inputText: guessAsWord.split(""),
      matches: matchingWords || []
    },
  });
};
