import { useEffect, useMemo, useRef, useState } from "react";
import { CellState, TCellState } from "../enums/CellState";
import { Player, TPlayer } from "../enums/Player";
import { checkForWin, validateNewSize } from "../utils/helpers";
import { WinnerModal } from "./WinnerModal";

interface IProps {
  size?: number;
}

export const TicTacToe = ({ size }: IProps) => {
  const [curPlayer, setCurPlayer] = useState<TPlayer>(Player.PLAYER_X);
  const [board, setBoard] = useState<TCellState[][] | undefined>(undefined);

  const modalRef = useRef() as any;

  // ----------------------------------------- //

  const setupBoard = () => {
    const setEmptyState = () => CellState.EMPTY as TCellState;
    const boardSize = validateNewSize(size);

    const emptyArray = Array.from({ length: boardSize }, setEmptyState);
    const initArray = emptyArray.map(() => emptyArray);

    setBoard(initArray);
  };

  // ----------------------------------------- //

  const openWinnerModal = () => {
    modalRef.current.open(curPlayer);
  };

  const renderCell = (
    cellState: TCellState,
    rowIndex: number,
    colIndex: number
  ) => {
    const cellContent = {
      [CellState.EMPTY]: "",
      [CellState.PLAYER_X]: "X",
      [CellState.PLAYER_O]: "O",
    }[cellState];

    const cellStyle = {
      [CellState.EMPTY]: "hover:bg-white/10",
      [CellState.PLAYER_X]: "bg-red-600/10",
      [CellState.PLAYER_O]: "bg-blue-600/10",
    }[cellState];

    const key = `${rowIndex}-${colIndex}`;
    const isDisabled = cellState !== CellState.EMPTY;

    return (
      <button
        key={key}
        onClick={() => updateBoard(rowIndex, colIndex)}
        disabled={isDisabled}
        className={`w-24 aspect-square mb-2 text-2xl text-white border border-white/50 ${cellStyle}`}
      >
        {cellContent}
      </button>
    );
  };

  const togglePlayer = () => {
    const getNextPlayer = (prevPlayer: TPlayer) => {
      const wasPlayerXLast = prevPlayer === Player.PLAYER_X;
      return wasPlayerXLast ? Player.PLAYER_O : Player.PLAYER_X;
    };

    setCurPlayer(getNextPlayer);
  };

  const updateBoard = (rowIndex: number, colIndex: number) => {
    const newCellValue = {
      [Player.PLAYER_X]: CellState.PLAYER_X,
      [Player.PLAYER_O]: CellState.PLAYER_O,
    }[curPlayer];

    const boardCopy = JSON.parse(JSON.stringify(board));
    boardCopy[rowIndex][colIndex] = newCellValue;

    setBoard(boardCopy);

    const winConditionMet = checkForWin(
      curPlayer,
      boardCopy,
      rowIndex,
      colIndex
    );
    if (winConditionMet) {
      openWinnerModal();
    } else {
      togglePlayer();
    }
  };

  // ----------------------------------------- //

  useEffect(() => setupBoard(), []);

  const renderedBoard = useMemo(() => {
    if (!board) {
      return <></>;
    }

    return board.map((curRow, rowIndex) => {
      return (
        <div key={rowIndex} className="flex gap-2">
          {curRow.map((curCell, colIndex) =>
            renderCell(curCell, rowIndex, colIndex)
          )}
        </div>
      );
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  // ----------------------------------------- //

  return (
    <div>
      <WinnerModal ref={modalRef} resetGame={setupBoard} />
      {renderedBoard}
    </div>
  );
};
