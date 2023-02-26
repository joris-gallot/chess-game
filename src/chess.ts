import { Chess } from "./classes";
import { BoardPosition, BoardSquare, isDivElement, SIZE } from "./types";

const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
const activeSquareClasses = ["bg-blue-400"];
const squareClasses = [
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
  "select-none",
];

export function setupChess(element: HTMLDivElement): void {
  window.chess = new Chess(element);

  const boardEl = document.createElement("div");
  boardEl.classList.add("flex", "flex-col", "items-center", "justify-center");

  const xRowEl = setupXRow();
  boardEl.append(xRowEl);

  window.chess.board.forEach((boardSquares, i) => {
    const rowEl = document.createElement("div");
    rowEl.id = `row-${i + 1}`;
    rowEl.classList.add("flex");

    boardSquares.forEach((boardSquare, j) => {
      // add square only at first for current y value
      if (j === 0) {
        const ySquareEL = setupYSquare(i);
        rowEl.append(ySquareEL);
      }

      const position: BoardPosition = { x: j + 1, y: SIZE - i };
      const squareEl = setupBoardSquare(boardSquare, position);

      rowEl.append(squareEl);
    });

    boardEl.append(rowEl);
  });

  window.addEventListener("click", ({ target }: MouseEvent) => {
    // reset style only if element clicked is not a board square
    if (target && isDivElement(target) && !target.dataset.isBoardSquare) {
      resetStyleAllSquares();
    }
  });

  element.append(boardEl);
}

function onClickSquare({ pawn }: BoardSquare, element: HTMLDivElement): void {
  if (pawn) {
    selectSquare(element);
    // const { availablePositions } = square.pawn;
    // console.log("availablePositions", pawn.availablePositions());
  }
}

function resetStyleAllSquares() {
  window.chess.getAllSquaresElement().forEach((element) => {
    element.classList.remove(...activeSquareClasses);
    element.classList.add(...squareClasses);
  });
}

function selectSquare(element: HTMLDivElement) {
  resetStyleAllSquares();
  element.classList.add(...activeSquareClasses);
  element.classList.remove("hover:bg-gray-500");
}

function setupBoardSquare(
  square: BoardSquare,
  { x, y }: BoardPosition
): HTMLDivElement {
  const squareEl = document.createElement("div");
  squareEl.id = `${letters[x - 1]}-${y}`;
  squareEl.dataset.isBoardSquare = true.toString();

  squareEl.addEventListener("click", ({ target }: MouseEvent) =>
    onClickSquare(square, target as HTMLDivElement)
  );
  const { pawn } = square;

  if (pawn) {
    squareEl.classList.add(
      pawn.belongsToWhitePlayer ? "text-gray-200" : "text-yellow-400"
    );
  }

  squareEl.classList.add(...squareClasses);
  squareEl.textContent = square.symbol;

  return squareEl;
}

function setupYSquare(index: number): HTMLDivElement {
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

  return squareYEl;
}

function setupXRow(size = SIZE): HTMLDivElement {
  const rowXEl = document.createElement("div");
  rowXEl.id = "row-0";
  rowXEl.classList.add("flex");

  const ySquareEl = setupYSquare(-1);
  rowXEl.append(ySquareEl);

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

  return rowXEl;
}
