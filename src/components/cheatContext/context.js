import React, { useContext, useReducer } from "react";
import { initialState, CheatContextReducer } from "./reducer";

const CheatContext = React.createContext();
const CheatContextDispatch = React.createContext();

export const useCheatState = () => useContext(CheatContext);
export const useCheatDispatch = () => useContext(CheatContextDispatch);

const CheatProvider = ({ children }) => {
  const [game, dispatch] = useReducer(CheatContextReducer, initialState);

  return (
    <CheatContext.Provider value={game}>
      <CheatContextDispatch.Provider value={dispatch}>
        {children}
      </CheatContextDispatch.Provider>
    </CheatContext.Provider>
  );
};

export default CheatProvider;
