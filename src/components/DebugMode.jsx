import React from "react";
import { useCheatState } from "./cheatContext";

const DebugMode = () => {
  const gameState = useCheatState();
  if (process.env.NODE_ENV === "development") {
    return <code>{JSON.stringify(gameState, null, 2)}</code>;
  }
  return null;
};

export default DebugMode;
