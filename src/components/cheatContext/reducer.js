import { CHEAT_ACTIONS } from "./actions";

export const buildInitialInput = (numLetters) => [...Array(numLetters)].map(e => ".")

export const initialState = {
  numLetters: 5,
  inputText: buildInitialInput(5),
  matchingWords: [],
  errorMessage: null,
  guessHasBeenMade: false
};

export const CheatContextReducer = (state, action) => {
  switch (action.type) {
    case CHEAT_ACTIONS.NEW_CHEAT:
      return {
        ...initialState,
        numLetters: action.payload.numLetters || 5,
        inputText: action.payload.word,
      };
    case CHEAT_ACTIONS.NEW_CHEAT_WITH_LETTER_CHANGE:
      return {
        ...initialState,
        numLetters: action.payload.numLetters || 5,
        inputText: buildInitialInput(action.payload.numLetters || 5),
      };
      case CHEAT_ACTIONS.POPULATE_MATCHES:
        return {
          ...state,
          numLetters: action.payload.numLetters || 5,
          inputText: action.payload.inputText,
          matchingWords: action.payload.matches || [],
          guessHasBeenMade: true
        };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
