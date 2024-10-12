import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=5, ncols=5, chanceLightStartsOn=0.25 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    // TODO: create array-of-arrays of true/false values
    let initialBoard = [];
    for (let row = 0; row < nrows; row++){
       let rowArr = [];
       for (let col = 0; col < ncols; col++) {        
          rowArr.push(Math.random() < chanceLightStartsOn); 
       }
       initialBoard.push(rowArr);
    }
  
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    let userHasWon = true;
    board.forEach(row => {
      row.forEach(col => {
        if (col) userHasWon = false;
      })
    })
    return userHasWon;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(row => [...row]);

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);

      // TODO: return the copy
      return boardCopy
    });
  }

  // TODO: if the game is won, just show a winning msg & render nothing else
  if (hasWon()) return <div>You Win!</div>;

  // TODO: make table board
  let tableBoard = board.map((row, yIdx) => 
    <tr key={yIdx}> { row.map((col, xIdx) => 
      <Cell 
        key={`${yIdx}-${xIdx}`}
        isLit={board[yIdx][xIdx]}
        flipCellsAroundMe={evt => flipCellsAround(`${yIdx}-${xIdx}`)}
      /> )}
    </tr> );
  

  return (
    <table className="Board">
      <tbody>{tableBoard}</tbody>
    </table>
  );
}

export default Board;
