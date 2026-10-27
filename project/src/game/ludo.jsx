
import { useState } from "react";
import { Link } from "react-router-dom";

const colors = [
  { name: "Red", value: "#C94C4C", light: "#F6D5D0" },
  { name: "Green", value: "#43865C", light: "#D7EAD8" },
  { name: "Yellow", value: "#D6A62E", light: "#F8E9AE" },
  { name: "Blue", value: "#477DB5", light: "#D7E6F7" },
];

const positions = [
  [0, 1], [1, 1], [2, 1], [3, 1], [4, 1],
  [0, 2], [1, 2], [2, 2], [3, 2], [4, 2],
  [0, 3], [1, 3], [2, 3], [3, 3], [4, 3],
  [0, 4], [1, 4], [2, 4], [3, 4], [4, 4],
];

export default function Ludo() {
  const [dice, setDice] = useState(null);
  const [position, setPosition] = useState(-1);
  const [message, setMessage] = useState("Roll the dice to start!");
  const [turn, setTurn] = useState(0);

  function rollDice() {
    const result = Math.floor(Math.random() * 6) + 1;
    setDice(result);

    if (position === -1 && result !== 6) {
      setMessage(`You rolled ${result}. You need a 6 to start!`);
    } else {
      const nextPosition =
        position === -1 ? 0 : (position + result) % positions.length;

      setPosition(nextPosition);
      setMessage(
        result === 6
          ? "Lucky six! Roll again 🎉"
          : `You rolled ${result}. Nice move!`
      );
    }

    if (result !== 6) {
      setTurn((previous) => previous + 1);
    }
  }

  function resetGame() {
    setDice(null);
    setPosition(-1);
    setTurn(0);
    setMessage("Roll the dice to start!");
  }

  return (
    <div className="min-h-screen bg-[#F8F0DF] text-[#4B2E24]">
      <nav className="flex items-center justify-between px-5 md:px-10 py-5 border-b border-[#D8C3A5]">
        <Link to="/" className="font-black text-xl">
          ← PlaySpace
        </Link>

        <span className="font-bold text-[#A66A45]">
          🎲 Ludo Game
        </span>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black">
            Let's Play Ludo!
          </h1>
          <p className="mt-3 text-[#806653]">
            Roll the dice and move your token around the board.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Ludo board */}
          <div className="bg-[#FFFDF7] p-3 sm:p-5 rounded-3xl shadow-lg border border-[#E3D1B5]">
            <div className="grid grid-cols-5 grid-rows-5 aspect-square gap-1 bg-[#D8C3A5] p-1 rounded-xl">
              {positions.map(([row, col], index) => {
                const active = position === index;

                return (
                  <div
                    key={`${row}-${col}`}
                    className={`relative flex items-center justify-center rounded-md border border-[#E3D1B5]
                      ${active ? "bg-[#C94C4C]" : "bg-[#F8F0DF]"}`}
                  >
                    {active ? (
                      <div className="w-5/12 aspect-square rounded-full bg-white border-4 border-[#F3B8A9] shadow-md" />
                    ) : (
                      <div className="w-2/5 aspect-square rounded-full bg-[#E9D8BD]" />
                    )}
                    {index === 0 && (
                      <span className="absolute bottom-0.5 text-[9px] font-bold">
                        START
                      </span>
                    )}
                    {index === 12 && (
                      <span className="text-xl">★</span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-5">
              {colors.map((color) => (
                <div
                  key={color.name}
                  className="flex items-center gap-2 p-3 rounded-xl"
                  style={{ backgroundColor: color.light }}
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: color.value }}
                  />
                  <span className="text-sm font-semibold">
                    {color.name} Player
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Game controls */}
          <div className="bg-[#FFFDF7] rounded-3xl p-6 md:p-8 shadow-lg border border-[#E3D1B5]">
            <p className="text-sm uppercase tracking-widest text-[#806653] font-bold">
              Your turn
            </p>

            <h2 className="text-2xl font-black mt-2">
              Player 1
            </h2>

            <div className="flex justify-center py-8">
              <div className="w-28 h-28 flex items-center justify-center rounded-3xl bg-[#F1E2CA] border-2 border-[#D8C3A5] text-6xl shadow-inner">
                {dice ?? "🎲"}
              </div>
            </div>

            <p className="text-center text-[#806653] min-h-12 mb-5">
              {message}
            </p>

            <button
              onClick={rollDice}
              className="w-full py-4 rounded-2xl bg-[#6F4534] hover:bg-[#A66A45] text-[#FFF8EA] font-bold text-lg shadow-md transition-colors"
            >
              Roll Dice 🎲
            </button>

            <button
              onClick={resetGame}
              className="w-full mt-3 py-3 rounded-2xl border-2 border-[#D8C3A5] hover:bg-[#F1E2CA] font-semibold transition-colors"
            >
              Restart Game
            </button>

            <div className="mt-6 pt-5 border-t border-[#E3D1B5] flex justify-between text-sm text-[#806653]">
              <span>Moves</span>
              <span className="font-bold">{turn}</span>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-[#806653] mt-10">
          This is a starter Ludo demo with one token, not a full
          four-player Ludo implementation.
        </p>
      </main>
    </div>
  );
}
