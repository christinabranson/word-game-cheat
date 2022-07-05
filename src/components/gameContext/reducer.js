import { GAME_ACTIONS } from "./actions";

const STORED_SESSION_NAME = "storedWordGame";

const buildInitialGuess = (numLetters) => {
  const newObject = {};
  new Array(numLetters).fill("").map((item, index) => {
    newObject[index] = item;
  });
  return newObject;
};

export const initialState = {
  isGameWon: false,
  numLetters: 5,
  word: null,
  initialGuess: buildInitialGuess(5),
  guesses: [],
  errorMessage: null,
  shouldRevealWord: false,
};

export const GameContextReducer = (state, action) => {
  const getNewGuessesArray = (newGuess) => {
    const newGuessesArray = [...state.guesses];
    newGuessesArray.push(newGuess);
    return newGuessesArray;
  };
  switch (action.type) {
    case GAME_ACTIONS.SESSION_OR_NEW_GAME:
      const savedState = localStorage.getItem(STORED_SESSION_NAME);
      if (savedState) {
        return JSON.parse(savedState);
      }
      return {
        ...initialState,
        numLetters: action.payload.numLetters || 5,
        word: action.payload.word,
        initialGuess: buildInitialGuess(action.payload.numLetters),
      };
    case GAME_ACTIONS.NEW_GAME:
      return {
        ...initialState,
        numLetters: action.payload.numLetters || 5,
        word: action.payload.word,
        initialGuess: buildInitialGuess(action.payload.numLetters),
      };
    case GAME_ACTIONS.NEW_GAME_WITH_LETTER_CHANGE:
      return {
        ...initialState,
        numLetters: action.payload.numLetters || 5,
        word: action.payload.word,
        initialGuess: buildInitialGuess(action.payload.numLetters),
      };
    case GAME_ACTIONS.MAKE_GUESS:
      const newState = {
        ...state,
        guesses: getNewGuessesArray(action.payload.guess),
      };
      localStorage.setItem(STORED_SESSION_NAME, JSON.stringify(newState));
      return newState;
    case GAME_ACTIONS.WIN_GAME:
      localStorage.removeItem(STORED_SESSION_NAME);
      return {
        ...state,
        guesses: getNewGuessesArray(action.payload.guess),
        isGameWon: true,
      };
    case GAME_ACTIONS.GIVE_UP:
      localStorage.removeItem(STORED_SESSION_NAME);
      return {
        ...state,
        shouldRevealWord: true,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
