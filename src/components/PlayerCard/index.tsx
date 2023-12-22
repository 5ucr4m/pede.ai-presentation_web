import React from "react";
import cardBack from "../../assets/card-background.png";

interface PlayerCardProps {
  playerName: string;
  selected: boolean;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  playerName,
  selected,
}) => {
  return (
    <div className="flex flex-col items-center">
      {selected ? (
        <div
          className="w-16 h-28 bg-gray-200 rounded-md"
          style={{
            backgroundImage: `url(${cardBack})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            border: "3px solid #E5E7EB",
          }}
        />
      ) : (
        <div className="w-16 h-28 bg-gray-200 rounded-md" />
      )}
      <p className="text-center mt-2">{playerName}</p>
    </div>
  );
};
