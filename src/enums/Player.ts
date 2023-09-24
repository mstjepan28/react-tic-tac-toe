export const Player = {
  PLAYER_X: "player_x",
  PLAYER_O: "player_o",
} as const;

export type TPlayer = (typeof Player)[keyof typeof Player];
