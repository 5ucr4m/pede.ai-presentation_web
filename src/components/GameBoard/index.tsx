import React, { useState } from "react";
import { Card } from "../Card";
import { PlayerCard } from "../PlayerCard";

const fibonacciSeries = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, "?", "☕"];

export const GameBoard: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<string | number | null>(
    null
  );

  const handleCardSelect = (value: string | number) => {
    setSelectedCard(value);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center p-4 h-full w-full ">
        <div>
          <PlayerCard selected={!!selectedCard} playerName="Marcus Soares" />
        </div>

        <div className="flex items-center justify-center w-1/3 h-1/4 bg-white rounded-lg my-10">
          <button className="bg-red-500 text-lg font-bold text-white px-6 py-2 rounded my-4">
            Reveal cards
          </button>
        </div>

        <div>
          <PlayerCard selected={!!selectedCard} playerName="Marcus Soares" />
        </div>
      </div>
      <div className="flex justify-center flex-wrap mt-auto mb-6">
        {fibonacciSeries.map((value) => (
          <Card
            key={value.toString()}
            value={value}
            selected={selectedCard === value}
            onSelect={handleCardSelect}
          />
        ))}
      </div>
    </>
  );
};
