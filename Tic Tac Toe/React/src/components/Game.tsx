import { useCallback, useState } from "react";
import Cell from "./Cell";
const GRIDSIZE = 3;
interface gameprogress {
  rows: Record<number, number>;
  cols: Record<number, number>;
  diag: number;
  antidiag: number;
}
export default function Game() {
  const [gameBoard, setGameBoard] = useState(
    new Array(GRIDSIZE).fill(null).map(() => new Array(GRIDSIZE).fill(null))
  );
  const [gameProgress, setGameProgress] = useState<gameprogress>({
    rows: {},
    cols: {},
    diag: 0,
    antidiag: 0,
  });
  const [player, setPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<"X" | "O" | null | "DRAW">(null);
  const [moveCount, setMoveCount] = useState<number>(0);

  const togglePlayer = useCallback(
    (
      row: number,
      col: number,
      curplayer: "X" | "O",
      currentProgress: gameprogress
    ) => {
      const value = curplayer === "X" ? 1 : -1;
      const newboard = gameBoard.map((r) => [...r]);
      newboard[row][col] = curplayer;
      setGameBoard(newboard);
      const prevref = {
        rows: {
          ...currentProgress.rows,
          [row]: (currentProgress.rows[row] || 0) + value,
        },
        cols: {
          ...currentProgress.cols,
          [col]: (currentProgress.cols[col] || 0) + value,
        },
        diag: row === col ? currentProgress.diag + value : currentProgress.diag,
        antidiag:
          row + col === gameBoard.length - 1
            ? currentProgress.antidiag + value
            : currentProgress.antidiag,
      };
      setGameProgress(prevref);
      if (checkWinner(row, col, prevref)) {
        setWinner(curplayer);
      } else if (moveCount === GRIDSIZE * GRIDSIZE - 1) {
        setWinner("DRAW");
      } else {
        setPlayer((curplayer) => (curplayer === "X" ? "O" : "X"));
        setMoveCount((prev) => prev + 1);
      }
    },
    [moveCount]
  );

  const checkWinner = useCallback(function checkWinner(
    row: number,
    col: number,
    progress: gameprogress
  ) {
    const { rows, cols, diag, antidiag } = progress;
    return (
      Math.abs(rows[row]) === gameBoard.length ||
      Math.abs(cols[col]) === gameBoard.length ||
      Math.abs(diag) === gameBoard.length ||
      Math.abs(antidiag) === gameBoard.length
    );
  },
  []);

  const reset = useCallback(function reset() {
    setGameProgress({
      rows: {},
      cols: {},
      diag: 0,
      antidiag: 0,
    });
    setWinner(null);
    setGameBoard(
      new Array(GRIDSIZE).fill(null).map(() => new Array(GRIDSIZE).fill(null))
    );
    setMoveCount(0)
    setPlayer("X")
  }, []);

  return (
    <>
      <div className="gamecontainer">
        {gameBoard.map((row, idx) => (
          <div className="gamecontainer_row" key={idx}>
            {row.map((col, colidx) => (
              <Cell
                key={`${idx}${colidx}`}
                togglePlayer={() =>
                  togglePlayer(idx, colidx, player, gameProgress)
                }
                player={col}
                disabled={winner === null ? false : true}
              />
            ))}
          </div>
        ))}
      </div>
      <div>Result: {winner}</div>
      <div>
        <button onClick={reset}>reset</button>
      </div>
    </>
  );
}
