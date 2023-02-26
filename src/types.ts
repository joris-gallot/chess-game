import { ValueOf } from "type-fest";
import { Pawn } from "./classes";

export const SIZE = 8;

export type BoardPosition = {
  x: number;
  y: number;
};

export type BoardSquare = {
  symbol: SquareSymbol;
  pawn?: Pawn & { belongsToWhitePlayer: boolean };
};

export const SquareSymbol = {
  EMPTY: " ",
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
