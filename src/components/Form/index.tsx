import React, { useState } from "react";

interface GameFormProps {
  onCreateGame: (name: string, votingSystem: string) => void;
}

const votingOptions = [
  {
    id: "FIBONACCI",
    label: "Fibonacci ( 0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ?, ♾️ )",
  },
];

const GameForm: React.FC<GameFormProps> = ({ onCreateGame }) => {
  const [gameName, setGameName] = useState("");
  const [votingSystem, setVotingSystem] = useState(votingOptions[0].id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateGame(gameName, votingSystem);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="gameName"
          className="block text-lg font-bold text-gray-200"
        >
          Game's name
        </label>
        <input
          type="text"
          id="gameName"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 p-4 h-[54px]"
          placeholder="Game's name"
          required
        />
      </div>
      <div>
        <label
          htmlFor="votingSystem"
          className="block text-lg font-bold text-gray-200"
        >
          Voting system
        </label>
        <select
          id="votingSystem"
          value={votingSystem}
          onChange={(e) => setVotingSystem(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 h-[54px] px-4"
        >
          {votingOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div></div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center items-center border border-transparent rounded-md shadow-sm text-white text-lg font-bold bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 h-[54px] mt-6"
        >
          Create game
        </button>
      </div>
    </form>
  );
};

export default GameForm;
