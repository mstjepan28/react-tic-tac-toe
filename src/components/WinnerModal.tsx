import { forwardRef, useImperativeHandle, useState } from "react";
import { Player, TPlayer } from "../enums/Player";

interface IProps {
  resetGame: () => void;
}

export const WinnerModal = forwardRef(({ resetGame }: IProps, ref) => {
  const [winningPlayer, setWinningPlayer] = useState<string>("Player X");
  const MODAL_ID = "winner-modal";

  // ----------------------------------------- //

  const openModal = () => {
    const modal = document.getElementById(MODAL_ID);
    if (!modal) {
      console.error("Winner modal not found");
      return;
    }

    modal.classList.remove("hidden");
    modal.classList.add("flex");
  };

  const closeModal = () => {
    const modal = document.getElementById(MODAL_ID);
    if (!modal) {
      console.error("Winner modal not found");
      resetGame();
      return;
    }

    modal.classList.add("hidden");
    modal.classList.remove("flex");
  };

  // ----------------------------------------- //

  const playAgain = () => {
    resetGame();
    closeModal();
  };

  useImperativeHandle(ref, () => ({
    open(winner: TPlayer) {
      const player = {
        [Player.PLAYER_X]: "Player X",
        [Player.PLAYER_O]: "Player O",
      }[winner];

      openModal();
      setWinningPlayer(player);
    },
  }));

  // ----------------------------------------- //

  return (
    <div
      id={MODAL_ID}
      className="fixed inset-0 hidden items-center justify-center  bg-black/50"
    >
      <div className="flex flex-col items-center gap-y-4 bg-green-600 p-4 border border-white rounded-lg">
        <h1 className="uppercase text-white text-4xl font-medium">
          {winningPlayer} wins!
        </h1>

        <button
          type="button"
          onClick={playAgain}
          className="w-full px-4 py-2 text-white border border-white rounded-lg hover:bg-white hover:text-green-600 hover:shadow-md active:shadow-lg"
        >
          <span className="uppercase font-medium">Play again</span>
        </button>
      </div>
    </div>
  );
});
