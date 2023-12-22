import React from "react";

interface CardProps {
  value: string | number;
  selected?: boolean;
  onSelect?: (value: string | number) => void;
}

export const Card: React.FC<CardProps> = ({ value, selected, onSelect }) => {
  const handleClick = () => {
    if (onSelect) {
      onSelect(value);
    }
  };

  return (
    <button
      className={`px-4 py-2 border rounded h-[120px] w-[70px] text-2xl  m-1 
      ${selected ? "bg-red-600 border-red-200" : "bg-red-100 text-gray-600"}`}
      onClick={handleClick}
    >
      {value}
    </button>
  );
};
