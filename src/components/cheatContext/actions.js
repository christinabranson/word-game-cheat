import { getMatchingWords } from "../../dictionary/handleWords";

export const CHEAT_ACTIONS = {
  NEW_CHEAT: "cheatContext/newCheat",
  NEW_CHEAT_WITH_LETTER_CHANGE: "cheatContext/newGameLetterChange",
  POPULATE_MATCHES: "cheatContext/populateMatches",
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

export const getGuesses = async (cheatDispatch, guessAsWord, numLetters = 5) => {

  const guessAsRegex = new RegExp(guessAsWord);
  console.log("guessAsRegex: ", guessAsRegex);
  console.log("guessAsRegex: ", guessAsRegex.test('axles'));


  const matchingWords = await getMatchingWords(guessAsRegex, numLetters);
  console.log("matchingWords: ", matchingWords);

  cheatDispatch({
    type: CHEAT_ACTIONS.POPULATE_MATCHES,
    payload: { 
      numLetters: numLetters,
      inputText: guessAsWord.split(""),
      matches: matchingWords || []
    },
  });
};
