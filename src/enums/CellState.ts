export const CellState = {
  EMPTY: 0,
  PLAYER_X: 1,
  PLAYER_O: 2,
} as const;

export type TCellState = (typeof CellState)[keyof typeof CellState];
