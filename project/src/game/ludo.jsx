import { useState } from "react";
import { Link } from "react-router-dom";

const PLAYERS = [
  { name: "Red", color: "#D94343", light: "#F9DADA", start: 0, home: [0, 0] },
  { name: "Green", color: "#29985B", light: "#D4F2DF", start: 13, home: [0, 9] },
  { name: "Yellow", color: "#E8B629", light: "#FFF0BC", start: 26, home: [9, 9] },
  { name: "Blue", color: "#3479D0", light: "#D8E8FF", start: 39, home: [9, 0] },
];

const TRACK = [
  [6, 1], [6, 2], [6, 3], [6, 4], [6, 5],
  [5, 6], [4, 6], [3, 6], [2, 6], [1, 6],
  [0, 7],
  [1, 8], [2, 8], [3, 8], [4, 8], [5, 8],
  [6, 9], [6, 10], [6, 11], [6, 12], [6, 13],
  [7, 14],
  [8, 13], [8, 12], [8, 11], [8, 10], [8, 9],
  [9, 8], [10, 8], [11, 8], [12, 8], [13, 8],
  [14, 7],
  [13, 6], [12, 6], [11, 6], [10, 6], [9, 6],
  [8, 5], [8, 4], [8, 3], [8, 2], [8, 1],
  [7, 0],
  [6, 0],
  [6, 1],
];

const SAFE = [0, 8, 13, 21, 26, 34, 39, 47];

const HOME_PATHS = [
  [[7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6]],
  [[1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7]],
  [[7, 13], [7, 12], [7, 11], [7, 10], [7, 9], [7, 8]],
  [[13, 7], [12, 7], [11, 7], [10, 7], [9, 7], [8, 7]],
];

function newPlayers() {
  return PLAYERS.map((p) => ({
    ...p,
    tokens: Array.from({ length: 4 }, (_, id) => ({
      id,
      progress: -1,
    })),
  }));
}

function sameCell(a, b) {
  return a && b && a[0] === b[0] && a[1] === b[1];
}

export default function Ludo() {
  const [players, setPlayers] = useState(newPlayers);
  const [turn, setTurn] = useState(0);
  const [dice, setDice] = useState(null);
  const [rolled, setRolled] = useState(false);
  const [message, setMessage] = useState(
    "Red starts! Roll a 6 to bring a token onto the board."
  );
  const [winner, setWinner] = useState(null);
  const [rollCount, setRollCount] = useState(0);

  const current = players[turn];

  function globalPosition(playerIndex, progress) {
    return (PLAYERS[playerIndex].start + progress) % 52;
  }

  function tokenCell(playerIndex, token) {
    if (token.progress === -1) {
      const home = PLAYERS[playerIndex].home;
      const offsets = [
        [1, 1], [1, 3], [3, 1], [3, 3],
      ];
      return [
        home[0] + offsets[token.id][0],
        home[1] + offsets[token.id][1],
      ];
    }

    if (token.progress >= 52) {
      return HOME_PATHS[playerIndex][Math.min(token.progress - 52, 5)];
    }

    return TRACK[globalPosition(playerIndex, token.progress)];
  }

  function movableTokens(result) {
    return current.tokens.filter((token) => {
      if (token.progress === -1) return result === 6;
      return token.progress + result <= 57;
    });
  }

  function rollDice() {
    if (winner || rolled) return;

    const result = Math.floor(Math.random() * 6) + 1;
    setDice(result);
    setRollCount((count) => count + 1);

    const possible = movableTokens(result);

    if (possible.length === 0) {
      setMessage(
        `${current.name} rolled ${result}. No legal move. ${
          result === 6 ? "Roll again!" : "Next player's turn."
        }`
      );

      if (result !== 6) {
        setTurn((turn + 1) % 4);
      }

      return;
    }

    setRolled(true);
    setMessage(
      `${current.name} rolled ${result}. Select one of the highlighted tokens.`
    );
  }

  function moveToken(tokenId) {
    if (!rolled || winner || dice === null) return;

    const selected = current.tokens.find((t) => t.id === tokenId);
    if (!selected) return;

    if (
      selected.progress === -1 && dice !== 6
    ) {
      return;
    }

    const nextProgress =
      selected.progress === -1 ? 0 : selected.progress + dice;

    if (nextProgress > 57) return;

    const nextPlayers = players.map((p) => ({
      ...p,
      tokens: p.tokens.map((t) => ({ ...t })),
    }));

    nextPlayers[turn].tokens[tokenId].progress = nextProgress;

    let captured = false;

    // Capture opponent tokens on non-safe outer squares.
    if (nextProgress < 52) {
      const landing = globalPosition(turn, nextProgress);

      if (!SAFE.includes(landing)) {
        nextPlayers.forEach((opponent, opponentIndex) => {
          if (opponentIndex === turn) return;

          opponent.tokens.forEach((token) => {
            if (
              token.progress >= 0 &&
              token.progress < 52 &&
              globalPosition(opponentIndex, token.progress) === landing
            ) {
              token.progress = -1;
              captured = true;
            }
          });
        });
      }
    }

    const won = nextPlayers[turn].tokens.every(
      (t) => t.progress === 57
    );

    setPlayers(nextPlayers);
    setRolled(false);

    if (won) {
      setWinner(current.name);
      setMessage(`🎉 ${current.name} wins!`);
      return;
    }

    const extraTurn = dice === 6 || captured;

    setMessage(
      captured
        ? `${current.name} captured an opponent! ${
            extraTurn ? "Roll again." : ""
          }`
        : nextProgress === 57
          ? `${current.name} reached the finish!`
          : `${current.name} moved token ${tokenId + 1}. ${
              extraTurn ? "Roll again!" : ""
            }`
    );

    if (!extraTurn) {
      setTurn((turn + 1) % 4);
    }
  }

  function restartGame() {
    setPlayers(newPlayers());
    setTurn(0);
    setDice(null);
    setRolled(false);
    setWinner(null);
    setRollCount(0);
    setMessage("Red starts! Roll a 6 to bring a token onto the board.");
  }

  function tokenCanMove(token) {
    if (!rolled || winner || dice === null) return false;
    if (token.progress === -1) return dice === 6;
    return token.progress + dice <= 57;
  }

  function renderCell(row, col) {
    const homeZones = [
      { r: 0, c: 0, color: "#D94343" },
      { r: 0, c: 9, color: "#29985B" },
      { r: 9, c: 9, color: "#E8B629" },
      { r: 9, c: 0, color: "#3479D0" },
    ];

    const zone = homeZones.find(
      (z) =>
        row >= z.r &&
        row < z.r + 6 &&
        col >= z.c &&
        col < z.c + 6
    );

    const homeSquare = zone
      ? row >= zone.r + 1 &&
        row <= zone.r + 4 &&
        col >= zone.c + 1 &&
        col <= zone.c + 4
      : false;

    const trackIndex = TRACK.findIndex(([r, c]) => r === row && c === col);
    const homeIndex = HOME_PATHS.findIndex((path) =>
      path.some(([r, c]) => r === row && c === col)
    );

    const isCenter = row >= 6 && row <= 8 && col >= 6 && col <= 8;

    let background = "#FFFFFF";
    let className = "border border-gray-200";

    if (zone) {
      background = zone.color;
      if (homeSquare) background = "#FFFFFF";
    } else if (trackIndex >= 0) {
      background = "#FFFFFF";
    } else if (homeIndex >= 0) {
      background = PLAYERS[homeIndex].color;
    } else if (isCenter) {
      background = "#F5D58A";
    } else {
      background = "#F0F0F0";
    }

    if (trackIndex >= 0 && SAFE.includes(trackIndex)) {
      background = "#E8E8E8";
    }

    const tokens = [];

    players.forEach((p, playerIndex) => {
      p.tokens.forEach((token) => {
        const cell = tokenCell(playerIndex, token);

        if (sameCell(cell, [row, col])) {
          tokens.push({ playerIndex, token });
        }
      });
    });

    const movable = tokens.some(
      ({ playerIndex, token }) =>
        playerIndex === turn && tokenCanMove(token)
    );

    return (
      <div
        key={`${row}-${col}`}
        className={`relative flex items-center justify-center min-w-0 min-h-0 ${className}`}
        style={{ backgroundColor: background }}
      >
        {zone && homeSquare && (
          <div
            className="absolute inset-0.5 rounded-md"
            style={{ backgroundColor: zone.color }}
          />
        )}

        {isCenter && (
          <span className="text-[7px] sm:text-xs font-black">★</span>
        )}

        {trackIndex >= 0 && SAFE.includes(trackIndex) && (
          <span className="text-[8px] sm:text-xs text-gray-500">★</span>
        )}

        {tokens.map(({ playerIndex, token }) => {
          const canSelect =
            playerIndex === turn && tokenCanMove(token);

          return (
            <button
              key={`${playerIndex}-${token.id}`}
              disabled={!canSelect}
              onClick={() => moveToken(token.id)}
              title={`${PLAYERS[playerIndex].name} token ${token.id + 1}`}
              className={`absolute z-10 rounded-full flex items-center justify-center text-white font-black border-2 border-white shadow-sm ${
                canSelect
                  ? "animate-pulse cursor-pointer ring-2 ring-black"
                  : "cursor-default"
              }`}
              style={{
                backgroundColor: PLAYERS[playerIndex].color,
                width: "75%",
                height: "75%",
                fontSize: "clamp(6px, 1.4vw, 12px)",
              }}
            >
              {token.progress === 57 ? "★" : token.id + 1}
            </button>
          );
        })}

        {movable && tokens.length === 0 && (
          <span className="text-[7px] text-black/50">●</span>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F0DF] text-[#4B2E24]">
      <nav className="flex items-center justify-between px-4 md:px-10 py-4 border-b border-[#D8C3A5]">
        <Link to="/" className="font-black text-lg md:text-xl">
          ← PlaySpace
        </Link>
        <span className="font-bold text-[#A66A45]">🎲 Ludo</span>
      </nav>

      <main className="max-w-6xl mx-auto px-3 md:px-6 py-6 md:py-10">
        <header className="text-center mb-6">
          <h1 className="text-3xl md:text-5xl font-black">
            Ludo Board
          </h1>
          <p className="mt-2 text-sm md:text-base text-[#806653]">
            Four players. One board. Roll the dice and play!
          </p>
        </header>

        <div className="grid lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] gap-5 md:gap-8 items-start">
          <section className="bg-white p-2 sm:p-4 rounded-2xl shadow-xl border border-[#D8C3A5]">
            <div
              className="grid aspect-square w-full overflow-hidden border-2 border-[#4B2E24]"
              style={{
                gridTemplateColumns: "repeat(15, minmax(0, 1fr))",
                gridTemplateRows: "repeat(15, minmax(0, 1fr))",
              }}
            >
              {Array.from({ length: 225 }, (_, index) =>
                renderCell(Math.floor(index / 15), index % 15)
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              {players.map((p, index) => (
                <div
                  key={p.name}
                  className={`rounded-xl p-2 sm:p-3 border-2 ${
                    turn === index && !winner
                      ? "border-[#4B2E24]"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: p.light }}
                >
                  <p className="font-bold text-sm sm:text-base">
                    {p.name}
                    {turn === index && !winner ? " • Turn" : ""}
                  </p>
                  <p className="text-xs sm:text-sm">
                    Home: {p.tokens.filter((t) => t.progress === -1).length}
                    {" · "}Finished:{" "}
                    {p.tokens.filter((t) => t.progress === 57).length}/4
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-[#FFFDF7] rounded-2xl p-5 md:p-7 shadow-lg border border-[#E3D1B5]">
            <p className="uppercase tracking-widest text-xs font-bold text-[#806653]">
              {winner ? "Game finished" : "Current player"}
            </p>

            <h2 className="text-2xl font-black mt-2">
              {winner ? `${winner} wins!` : `${current.name} Player`}
            </h2>

            <div className="flex justify-center py-6">
              <div
                className="w-24 h-24 md:w-28 md:h-28 rounded-3xl flex items-center justify-center text-6xl font-black border-2 border-[#D8C3A5] shadow-inner"
                style={{
                  backgroundColor: current.light,
                  color: current.color,
                }}
              >
                {dice ?? "🎲"}
              </div>
            </div>

            <p className="min-h-16 text-center text-sm text-[#806653]">
              {message}
            </p>

            <button
              onClick={rollDice}
              disabled={rolled || Boolean(winner)}
              className="w-full py-4 rounded-xl bg-[#6F4534] hover:bg-[#A66A45] disabled:opacity-40 text-white font-bold text-lg transition"
            >
              Roll Dice 🎲
            </button>

            <div className="mt-6">
              <h3 className="font-bold mb-3">Your tokens</h3>
              <div className="grid grid-cols-4 gap-2">
                {current.tokens.map((token) => (
                  <button
                    key={token.id}
                    onClick={() => moveToken(token.id)}
                    disabled={!tokenCanMove(token)}
                    className="p-2 rounded-xl border-2 disabled:opacity-40 font-bold"
                    style={{
                      backgroundColor: current.light,
                      borderColor: current.color,
                    }}
                  >
                    <span
                      className="mx-auto mb-1 flex w-7 h-7 rounded-full items-center justify-center text-white"
                      style={{ backgroundColor: current.color }}
                    >
                      {token.id + 1}
                    </span>
                    <span className="text-xs">
                      {token.progress === -1
                        ? "Home"
                        : token.progress === 57
                          ? "Done"
                          : "On board"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={restartGame}
              className="w-full mt-5 py-3 rounded-xl border-2 border-[#D8C3A5] hover:bg-[#F1E2CA] font-bold"
            >
              ↻ Restart Game
            </button>

            <div className="mt-5 pt-4 border-t border-[#E3D1B5] flex justify-between text-sm text-[#806653]">
              <span>Dice rolls</span>
              <span className="font-bold">{rollCount}</span>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}