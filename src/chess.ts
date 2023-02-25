import { Chess } from "./classes";
import { SIZE } from "./types";

const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];

export function setupChess(element: HTMLDivElement) {
  const chess = new Chess();

  const boardEl = document.createElement("div");
  boardEl.classList.add("flex", "flex-col", "items-center", "justify-center");

  setupXRow(boardEl);

  chess.board.forEach((pawns, i) => {
    const rowEl = document.createElement("div");
    rowEl.id = `row-${i + 1}`;
    rowEl.classList.add("flex");

    pawns.forEach((pawn, j) => {
      // add square for current y value
      if (j === 0) {
        setupYSquare(rowEl, i);
      }

      const squareEl = document.createElement("div");
      squareEl.id = `square-${j + 1}`;
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
      squareEl.textContent = pawn;
      rowEl.append(squareEl);
    });

    boardEl.append(rowEl);
  });

  element.append(boardEl);
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
