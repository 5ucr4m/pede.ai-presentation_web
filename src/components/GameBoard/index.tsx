import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import { Card } from "../Card";
import { PlayerCard } from "../PlayerCard";
import useSocket from "../../context/useSocket";

const fibonacciSeries = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, "?", "☕"];

export const GameBoard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedCard, setSelectedCard] = React.useState<string | number>("?");
  const {
    infos,
    userID,
    isRevealed,
    sendValue,
    joinRoom,
    revelCards,
    resetGame,
  } = useSocket();

  const isSelected = useMemo(() => {
    if (!infos) return false;

    const myUser = infos.find((info) => info.userID === userID);

    return !!myUser?.selected;
  }, [infos, userID]);

  const average = useMemo(() => {
    if (!infos) return 0;

    const values = infos
      .filter((info) => !!info.value)
      .filter((info) => info.value !== "?")
      .filter((info) => info.value !== "☕")
      .map((info) => Number(info.value));

    const sum = values.reduce((acc, value) => acc + value, 0);

    return Math.round(sum / values.length);
  }, [infos]);

  useEffect(() => {
    joinRoom(String(id));
  }, [joinRoom, id]);

  const handleCardSelect = (value: string | number) => {
    sendValue(value);
    setSelectedCard(value);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center p-4 h-full w-full ">
        <div className="flex flex-row gap-10">
          {infos.length > 0 && (
            <PlayerCard
              isRevealed={isRevealed}
              selected={infos[0].selected}
              playerName={infos[0].username}
              value={infos[0].value}
            />
          )}
          {infos.length > 2 && (
            <PlayerCard
              isRevealed={isRevealed}
              selected={infos[2].selected}
              playerName={infos[2].username}
              value={infos[2].value}
            />
          )}
          {infos.length > 4 && (
            <PlayerCard
              isRevealed={isRevealed}
              selected={infos[4].selected}
              playerName={infos[4].username}
              value={infos[4].value}
            />
          )}
          {infos.length > 6 && (
            <PlayerCard
              isRevealed={isRevealed}
              selected={infos[6].selected}
              playerName={infos[6].username}
              value={infos[6].value}
            />
          )}
          {infos.length > 8 && (
            <PlayerCard
              isRevealed={isRevealed}
              selected={infos[8].selected}
              playerName={infos[8].username}
              value={infos[6].value}
            />
          )}
        </div>

        <div className="flex flex-col items-center justify-center w-1/3 h-1/4 bg-white rounded-lg my-10">
          {isRevealed && (
            <p className="text-red-700 text-lg font-bold text-center capitalize">
              Media: {average}
            </p>
          )}
          {isRevealed ? (
            <button
              className="border-red-500 bg-white text-lg font-bold text-red-500 px-6 py-2 rounded my-4"
              onClick={resetGame}
            >
              New Game
            </button>
          ) : (
            <button
              className="bg-red-500 text-lg font-bold text-white px-6 py-2 rounded my-4"
              onClick={revelCards}
            >
              Reveal cards
            </button>
          )}
        </div>

        <div className="flex flex-row gap-10">
          {infos.length > 1 && (
            <PlayerCard
              isRevealed={isRevealed}
              selected={infos[1].selected}
              playerName={infos[1].username}
              value={infos[1].value}
            />
          )}
          {infos.length > 3 && (
            <PlayerCard
              isRevealed={isRevealed}
              selected={infos[3].selected}
              playerName={infos[3].username}
              value={infos[3].value}
            />
          )}
          {infos.length > 5 && (
            <PlayerCard
              isRevealed={isRevealed}
              selected={infos[5].selected}
              playerName={infos[5].username}
              value={infos[5].value}
            />
          )}
          {infos.length > 7 && (
            <PlayerCard
              isRevealed={isRevealed}
              selected={infos[7].selected}
              playerName={infos[7].username}
              value={infos[7].value}
            />
          )}
          {infos.length > 9 && (
            <PlayerCard
              isRevealed={isRevealed}
              selected={infos[9].selected}
              playerName={infos[9].username}
              value={infos[9].value}
            />
          )}
        </div>
      </div>
      <div className="flex justify-center flex-wrap mt-auto mb-6">
        {fibonacciSeries.map((value) => (
          <Card
            key={value.toString()}
            value={value}
            selected={isSelected && selectedCard === value}
            onSelect={handleCardSelect}
          />
        ))}
      </div>
    </>
  );
};
