import React, { useContext, useReducer } from "react";
import { initialState, GameContextReducer } from "./reducer";

const GameContext = React.createContext();
const GameContextDispatch = React.createContext();

export const useGameState = () => useContext(GameContext);
export const useGameDispatch = () => useContext(GameContextDispatch);

const GameProvider = ({ children }) => {
  const [game, dispatch] = useReducer(GameContextReducer, initialState);

  return (
    <GameContext.Provider value={game}>
      <GameContextDispatch.Provider value={dispatch}>
        {children}
      </GameContextDispatch.Provider>
    </GameContext.Provider>
  );
};

export default GameProvider;
