import { Chess } from "./classes";
import { BoardPosition, BoardSquare, SIZE } from "./types";

const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];

export function setupChess(element: HTMLDivElement) {
  const chess = new Chess();

  const boardEl = document.createElement("div");
  boardEl.classList.add("flex", "flex-col", "items-center", "justify-center");

  setupXRow(boardEl);

  chess.board.forEach((boardSquares, i) => {
    const rowEl = document.createElement("div");
    rowEl.id = `row-${i + 1}`;
    rowEl.classList.add("flex");

    boardSquares.forEach((boardSquare, j) => {
      // add square for current y value
      if (j === 0) {
        setupYSquare(rowEl, i);
      }

      const position: BoardPosition = { x: j + 1, y: SIZE - i };
      const squareEl = setupBoardSquare(boardSquare, position);

      rowEl.append(squareEl);
    });

    boardEl.append(rowEl);
  });

  element.append(boardEl);
}

function onClickSquare(square: BoardSquare) {
  console.log("square", square);
}

function setupBoardSquare(square: BoardSquare, { x, y }: BoardPosition) {
  const squareEl = document.createElement("div");
  squareEl.id = `${letters[x - 1]}-${y}`;

  squareEl.addEventListener("click", () => onClickSquare(square));
  const { pawn } = square;

  if (pawn) {
    squareEl.classList.add(
      pawn.belongsToWhitePlayer ? "text-gray-200" : "text-yellow-400"
    );
  }

  squareEl.classList.add(
    "flex",
    "items-center",
    "justify-center",
    "w-12",
    "h-12",
    "bg-gray-700",
    "border",
    "border-gray-600",
    "text-gray-200",
    "font-bold",
    "hover:bg-gray-500",
    "select-none"
  );
  squareEl.textContent = square.symbol;

  return squareEl;
}

function setupYSquare(rowEl: HTMLDivElement, index: number) {
  const squareYEl = document.createElement("div");

  squareYEl.id = `x-${index + 1}`;
  squareYEl.classList.add(
    "flex",
    "items-center",
    "justify-center",
    "w-12",
    "h-12",
    "text-gray-200",
    "font-bold",
    "select-none"
  );
  squareYEl.textContent = index >= 0 ? (SIZE - index).toString() : "";

  rowEl.append(squareYEl);
}

function setupXRow(boardEl: HTMLDivElement, size = SIZE) {
  const rowXEl = document.createElement("div");
  rowXEl.id = "row-0";
  rowXEl.classList.add("flex");

  setupYSquare(rowXEl, -1);

  for (let i = 0; i < size; i++) {
    const squareEl = document.createElement("div");
    squareEl.id = `x-${i + 1}`;
    squareEl.classList.add(
      "flex",
      "items-center",
      "justify-center",
      "w-12",
      "h-12",
      "text-gray-200",
      "font-bold",
      "select-none"
    );
    squareEl.textContent = letters[i];
    rowXEl.append(squareEl);
  }

  boardEl.append(rowXEl);
}
