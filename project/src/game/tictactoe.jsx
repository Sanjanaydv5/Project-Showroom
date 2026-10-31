import React, { useState } from 'react';

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const winnerInfo = calculateWinner(board);
  const winner = winnerInfo ? winnerInfo.winner : null;
  const winningLine = winnerInfo ? winnerInfo.line : [];
  const isDraw = !winner && board.every((square) => square !== null);

  const handleClick = (index) => {
    if (winner || board[index]) return;

    const boardCopy = [...board];
    boardCopy[index] = isXNext ? 'X' : 'O';
    
    setBoard(boardCopy);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  // Status message text and color variables
  let statusText;
  let statusColor = "text-slate-700";
  
  if (winner) {
    statusText = `Winner: ${winner}`;
    statusColor = winner === 'X' ? "text-red-500 font-extrabold" : "text-blue-500 font-extrabold";
  } else if (isDraw) {
    statusText = "Game Draw!";
    statusColor = "text-amber-500";
  } else {
    statusText = `Next Player: ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 font-sans p-4">
      <h1 className="text-4xl font-black text-slate-800 mb-6 tracking-tight">
        Tic-Tac-Toe
      </h1>
      
      <div className={`text-2xl font-bold mb-6 transition-all ${statusColor}`}>
        {statusText}
      </div>
      
      {/* 3x3 Game Board Grid */}
      <div className="grid grid-cols-3 gap-2 bg-slate-300 p-2 rounded-xl shadow-xl">
        {board.map((square, index) => {
          const isWinningSquare = winningLine.includes(index);
          
          return (
            <button
              key={index}
              className={`w-24 h-24 text-4xl font-black rounded-lg transition-all duration-200 flex items-center justify-center select-none shadow-sm
                ${isWinningSquare 
                  ? 'bg-emerald-100 border-2 border-emerald-400 scale-[1.02]' 
                  : 'bg-white hover:bg-slate-100 active:scale-95 border border-slate-200'
                }
                ${square === 'X' ? 'text-red-500' : 'text-blue-500'}
              `}
              onClick={() => handleClick(index)}
            >
              {square}
            </button>
          );
        })}
      </div>

      <button 
        className="mt-8 px-6 py-3 text-lg font-bold text-white bg-slate-800 hover:bg-slate-900 active:scale-95 rounded-xl shadow-md transition-all duration-150 tracking-wide"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
}

// Helper function to calculate the winner
function calculateWinner(squares) {
  const lines = [, [3, 4, 5], [6, 7, 8], // Rows, [1, 4, 7], [2, 5, 8], // Columns, [2, 4, 6]             // Diagonals
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
}
