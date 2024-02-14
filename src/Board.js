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

function Board({ nrows, ncols, chanceLightStartsOn }) {

  const createBoard = () => {
    const numberOfCells = nrows * ncols;
    const newBoard = []

    for (let i = 0; i < numberOfCells; i++) {
      const chanceIsOn = Math.random() * 100

      if(chanceIsOn <= chanceLightStartsOn) {
        newBoard.push(true)
      } else {
        newBoard.push(false)
      }
    }


    return newBoard
  }

  const onClickCell = (index) => {
    const newBoard = [...board]

    newBoard[index] = !newBoard[index]

    if(index % ncols !== 0) {
      newBoard[index - 1] = !newBoard[index - 1]
    }

    if(index % ncols !== ncols - 1) {
      newBoard[index + 1] = !newBoard[index + 1]
    }

    if(index >= ncols) {
      newBoard[index - ncols] = !newBoard[index - ncols]
    }

    if(index < ncols * (nrows - 1)) {
      newBoard[index + ncols] = !newBoard[index + ncols]
    }

    setBoard(newBoard)
  }

  const didWin = () => {
    return board.every(cell => !cell)
  }


  const [board, setBoard] = useState(createBoard());

  return (
    <>
    {didWin() ? <h1>You won!</h1> : (
      <div className="board-container"
      style={{
        gridTemplateColumns: `repeat(${ncols}, 100px)`,
        gridTemplateRows: `repeat(${nrows}, 100px)`,
       justifyItems: "center",
        alignItems: "center"
      }}
      >
        {board.map((cellActive, key) => (
          <Cell index={key} active={cellActive} key={key}
          onClickCell={onClickCell}
          />
        ))}
      </div>
    )}
    </>
  )
}

export default Board;
