import React, { useEffect, useMemo } from "react";
import { Card } from "../Card";
import { PlayerCard } from "../PlayerCard";
import useSocket from "../../context/useSocket";
import { useParams } from "react-router-dom";

const fibonacciSeries = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, "?", "☕"];

export const GameBoard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedCard, setSelectedCard] = React.useState<string | number>("?");
  const { infos, userID, sendValue, joinRoom } = useSocket();

  const isSelected = useMemo(() => {
    if (!infos) return false;

    const myUser = infos.find((info) => info.userID === userID);

    return !!myUser?.selected;
  }, [infos, userID]);

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
              selected={infos[0].selected}
              playerName={infos[0].username}
            />
          )}
          {infos.length > 2 && (
            <PlayerCard
              selected={infos[2].selected}
              playerName={infos[2].username}
            />
          )}
          {infos.length > 4 && (
            <PlayerCard
              selected={infos[4].selected}
              playerName={infos[4].username}
            />
          )}
          {infos.length > 6 && (
            <PlayerCard
              selected={infos[6].selected}
              playerName={infos[6].username}
            />
          )}
          {infos.length > 8 && (
            <PlayerCard
              selected={infos[8].selected}
              playerName={infos[8].username}
            />
          )}
        </div>

        <div className="flex items-center justify-center w-1/3 h-1/4 bg-white rounded-lg my-10">
          <button className="bg-red-500 text-lg font-bold text-white px-6 py-2 rounded my-4">
            Reveal cards
          </button>
        </div>

        <div className="flex flex-row gap-10">
          {infos.length > 1 && (
            <PlayerCard
              selected={infos[1].selected}
              playerName={infos[1].username}
            />
          )}
          {infos.length > 3 && (
            <PlayerCard
              selected={infos[3].selected}
              playerName={infos[3].username}
            />
          )}
          {infos.length > 5 && (
            <PlayerCard
              selected={infos[5].selected}
              playerName={infos[5].username}
            />
          )}
          {infos.length > 7 && (
            <PlayerCard
              selected={infos[7].selected}
              playerName={infos[7].username}
            />
          )}
          {infos.length > 9 && (
            <PlayerCard
              selected={infos[9].selected}
              playerName={infos[9].username}
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
