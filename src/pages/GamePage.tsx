import React from "react";
import { GameBoard } from "../components/GameBoard";

export const GamePage: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4 mt-6">Planning Poker - Pede.ai</h1>
      <GameBoard />
    </div>
  );
};
