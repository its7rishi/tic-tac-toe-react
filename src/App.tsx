import { useState } from "react";
import "./App.css";

const App = () => {
  const [board, setBoard] = useState<string[]>(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState<string | null>();
  const [isDraw, setIsDraw] = useState<boolean>(false);

  const cellStyle = (cell: string) => {
    if (cell === "X") {
      return { color: "blue" };
    } else {
      return { color: "red" };
    }
  };

  const checkWinner = (arr: string[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    lines.forEach((line) => {
      const [a, b, c] = line;
      if (arr[a] === "" && arr[b] === "" && arr[c] === "") {
        return;
      } else if (arr[a] && arr[a] === arr[b] && arr[b] === arr[c]) {
        setWinner(arr[a]);
      }
    });
  };

  const handleClick = (index: number) => {
    const arr = [...board];
    if (arr[index] !== "" || winner) return;

    if (currentPlayer === "X") {
      arr[index] = "X";
      setCurrentPlayer("O");
    } else {
      arr[index] = "O";
      setCurrentPlayer("X");
    }
    checkWinner(arr);
    setBoard(arr);
    if (!arr.includes("") && !winner) {
      setIsDraw(true);
    }
  };

  const handleRefresh = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinner(null);
    setIsDraw(false);
  };

  return (
    <div className="container">
      <h1 className="title">
        Tic Tac Toe with <span>ReactJs</span>
      </h1>
      <h3 className="win-message">
        {winner ? `Player ${winner} wins!` : isDraw ? "It's a Tie!" : ""}{" "}
      </h3>
      <div className="game-container">
        <div className="board">
          {board.map((cell: string, index: number) => (
            <div
              className="cell"
              key={index}
              onClick={() => handleClick(index)}
              style={cellStyle(cell)}
            >
              {cell}
            </div>
          ))}
        </div>
        <button className="reset" onClick={handleRefresh}>
          Refresh
        </button>
      </div>
      .
    </div>
  );
};
export default App;
