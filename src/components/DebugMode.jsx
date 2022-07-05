import React from "react";
import { useGameState } from "./gameContext";

const DebugMode = () => {
  const gameState = useGameState();
  if (process.env.NODE_ENV === "development") {
    return <code>{JSON.stringify(gameState, null, 2)}</code>;
  }
  return null;
};

export default DebugMode;
