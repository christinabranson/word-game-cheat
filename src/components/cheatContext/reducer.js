import { CHEAT_ACTIONS } from "./actions";

export const buildInitialInput = (numLetters) => [...Array(numLetters)].map(e => ".")

export const initialState = {
  numLetters: 5,
  inputText: buildInitialInput(5),
  includedLetters: [],
  excludedLetters: [],
  matchingWords: [],
  errorMessage: null,
  guessHasBeenMade: false,
  isLoading: false,
};

export const CheatContextReducer = (state, action) => {

  let includedLetters = new Set(state.includedLetters);
  let excludedLetters = new Set(state.excludedLetters);

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
      case CHEAT_ACTIONS.SET_LOADING:
        return {
          ...state,
          loading: true,
        };
      case CHEAT_ACTIONS.POPULATE_MATCHES:
        return {
          ...state,
          numLetters: action.payload.numLetters || 5,
          inputText: action.payload.inputText,
          matchingWords: action.payload.matches || [],
          guessHasBeenMade: true,
          loading: false,
        };
        case CHEAT_ACTIONS.ADD_INCLUDED_LETTER:
          const includedLetter = action.payload.letter;

          includedLetters.add(includedLetter);
          excludedLetters.delete(includedLetter);
          
          return {
            ...state,
            includedLetters: [...includedLetters],
            excludedLetters: [...excludedLetters],
          };
        case CHEAT_ACTIONS.ADD_EXCLUDED_LETTER:
          const excludedLetter = action.payload.letter;

          includedLetters.delete(excludedLetter);
          excludedLetters.add(excludedLetter);
          
          return {
            ...state,
            includedLetters: [...includedLetters],
            excludedLetters: [...excludedLetters],
          };
          case CHEAT_ACTIONS.ADD_NONE_LETTER:
            const noneLetter = action.payload.letter;
            
            includedLetters.delete(noneLetter);
            excludedLetters.delete(noneLetter);

            return {
              ...state,
              includedLetters: [...includedLetters],
              excludedLetters: [...excludedLetters],
            };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
