import { ValueOf } from "type-fest";

export const SIZE = 8;

export type BoardPosition = {
  x: number;
  y: number;
};

export const SquareSymbol = {
  EMPTY: "E",
  PAWN: "P",
  QUEEN: "Q",
  ROOK: "R",
  BISHOP: "B",
  KNIGHT: "KN",
  KING: "KI",
} as const;

export type SquareSymbol = ValueOf<typeof SquareSymbol>;

export interface BasePawn {
  id: SquareSymbol;
  position: BoardPosition;
  availablePositions: () => BoardPosition[];
}
