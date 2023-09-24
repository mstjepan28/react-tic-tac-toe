export const BoardSize = {
  MIN: 3,
  MAX: 11,
} as const;

export type TBoardSize = (typeof BoardSize)[keyof typeof BoardSize];
