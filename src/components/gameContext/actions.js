import { getWord } from "../../dictionary/handleWords";

export const GAME_ACTIONS = {
  SESSION_OR_NEW_GAME: "gameContext/sessionOrNewGame",
  NEW_GAME: "gameContext/newGame",
  NEW_GAME_WITH_LETTER_CHANGE: "gameContext/newGameLetterChange",
  MAKE_GUESS: "gameContext/makeGuess",
  WIN_GAME: "gameContext/winGame",
  GIVE_UP: "gameContext/giveUp",
};

export const VALID_NUM_LETTERS = [4, 5, 6, 7, 8, 9, 10];

export const resumeSessionOrNewGame = async (gameDispatch, numLetters = 5) => {
  const newWord = await getWord(numLetters);
  gameDispatch({
    type: GAME_ACTIONS.SESSION_OR_NEW_GAME,
    payload: { numLetters: numLetters, word: newWord },
  });
};

export const startNewGame = async (gameDispatch, numLetters = 5) => {
  const newWord = await getWord(numLetters);
  gameDispatch({
    type: GAME_ACTIONS.NEW_GAME,
    payload: { numLetters: numLetters, word: newWord },
  });
};

export const changeLetterCount = async (gameDispatch, numLetters = 5) => {
  const newWord = await getWord(numLetters);
  gameDispatch({
    type: GAME_ACTIONS.NEW_GAME_WITH_LETTER_CHANGE,
    payload: { numLetters: numLetters, word: newWord },
  });
};
