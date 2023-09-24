import { BoardSize } from "../enums/BoardSize";
import { CellState, TCellState } from "../enums/CellState";
import { Player, TPlayer } from "../enums/Player";

/**
 * Valid sizes for the board are 3, 5, 7, 9, and 11
 * @param newSize The new board size that is going to be validated
 * @returns Validated size that is either the same as the newSize or the closest valid size
 */
export const validateNewSize = (newSize?: number) => {
  const newValue = newSize || BoardSize.MIN;

  if (newValue < BoardSize.MIN) {
    return BoardSize.MIN;
  } else if (newValue > BoardSize.MAX) {
    return BoardSize.MAX;
  }

  const isOdd = newValue % 2 !== 0;
  return isOdd ? newValue : newValue + 1;
};

export const checkForWin = (
  curPlayer: TPlayer,
  board: TCellState[][],
  rowIndex: number,
  colIndex: number
) => {
  const requiredState = {
    [Player.PLAYER_X]: CellState.PLAYER_X,
    [Player.PLAYER_O]: CellState.PLAYER_O,
  }[curPlayer];

  const length = board.length;

  const horizontalWin = Array.from({ length }).every((_, index) => {
    return board[rowIndex][index] === requiredState;
  });
  const verticalWin = Array.from({ length }).every((_, index) => {
    return board[index][colIndex] === requiredState;
  });
  const diagonalWin = Array.from({ length }).every((_, index) => {
    return board[index][index] === requiredState;
  });

  return horizontalWin || verticalWin || diagonalWin;
};

export const checkForDraw = (board: TCellState[][]) => {
  return board.flat().every((cell) => cell !== CellState.EMPTY);
};
