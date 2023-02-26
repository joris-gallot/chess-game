import { ValueOf } from "type-fest";
import { Chess, Pawn } from "./classes";

declare global {
  interface Window {
    chess: Chess;
  }
}

export function isDivElement(
  element: Element | EventTarget | HTMLDivElement
): element is HTMLDivElement {
  return (element as HTMLDivElement).tagName === "DIV";
}

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
