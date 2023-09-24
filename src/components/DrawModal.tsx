import { forwardRef, useImperativeHandle } from "react";

interface IProps {
  resetGame: () => void;
}

export const DrawModal = forwardRef(({ resetGame }: IProps, ref) => {
  const MODAL_ID = "draw-modal";

  // ----------------------------------------- //

  const openModal = () => {
    const modal = document.getElementById(MODAL_ID);
    if (!modal) {
      console.error("Draw modal not found");
      return;
    }

    modal.classList.remove("hidden");
    modal.classList.add("flex");
  };

  const closeModal = () => {
    const modal = document.getElementById(MODAL_ID);
    if (!modal) {
      console.error("Draw modal not found");
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
    open() {
      openModal();
    },
  }));

  // ----------------------------------------- //

  return (
    <div
      id={MODAL_ID}
      className="fixed inset-0 hidden items-center justify-center  bg-black/50"
    >
      <div className="flex flex-col items-center gap-y-4 bg-blue-600 p-4 border border-white rounded-lg">
        <h1 className="uppercase text-white text-4xl font-medium">
          It's a draw!
        </h1>

        <button
          type="button"
          onClick={playAgain}
          className="w-full px-4 py-2 text-white border border-white rounded-lg hover:bg-white hover:text-blue-600 hover:shadow-md active:shadow-lg"
        >
          <span className="uppercase font-medium">Play again</span>
        </button>
      </div>
    </div>
  );
});
