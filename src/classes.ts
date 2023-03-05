import {
  BasePawn,
  BoardPosition,
  BoardSquare,
  SIZE,
  SquareSymbol,
} from "./types";

function reverteY(isFirst: boolean, value: number) {
  const yDelta = SIZE + 1;
  return isFirst ? value : yDelta - value;
}

function validatePosition({ x, y }: BoardPosition): boolean {
  if (x > SIZE || x <= 0 || y > SIZE || y <= 0) {
    throw new Error(`wrong position x:${x} y:${y}`);
  }

  return true;
}

export class Pawn implements BasePawn {
  public id: SquareSymbol = SquareSymbol.PAWN;

  constructor(
    public position: BoardPosition,
    public belongsToWhitePlayer: boolean
  ) {}

  public availablePositions(): BoardPosition[] {
    return [
      {
        x: this.position.x,
        y: this.calcY(1),
      },
    ];
  }

  private calcY(value: number) {
    const calcYWhite =
      reverteY(this.belongsToWhitePlayer, this.position.y) + value;

    const calcYBlack = reverteY(
      this.belongsToWhitePlayer,
      reverteY(this.belongsToWhitePlayer, this.position.y) + value
    );

    return this.belongsToWhitePlayer ? calcYWhite : calcYBlack;
  }
}

class King extends Pawn {
  public id = SquareSymbol.KING;

  public availablePositions() {
    return [];
  }
}

class Queen extends Pawn {
  public id = SquareSymbol.QUEEN;

  public availablePositions() {
    return [];
  }
}

class Rook extends Pawn {
  public id = SquareSymbol.ROOK;

  public availablePositions() {
    return [];
  }
}

class Bishop extends Pawn {
  public id = SquareSymbol.BISHOP;

  public availablePositions() {
    return [];
  }
}

class Knight extends Pawn {
  public id = SquareSymbol.KNIGHT;

  public availablePositions() {
    return [];
  }
}

class Player {
  pawns: Pawn[] = [];

  constructor(isFirst = false) {
    this.initPawns(isFirst);
  }

  // TODO:
  public move(pawn: Pawn, position: BoardPosition) {
    validatePosition(position);
    pawn.position = position;
  }

  private initPawns(isFirst = false): void {
    // 8 pawns
    for (let i = 0; i < SIZE; i++) {
      this.pawns.push(new Pawn({ x: i + 1, y: reverteY(isFirst, 2) }, isFirst));
    }

    // 2 rooks
    this.pawns.push(new Rook({ x: 1, y: reverteY(isFirst, 1) }, isFirst));
    this.pawns.push(new Rook({ x: 8, y: reverteY(isFirst, 1) }, isFirst));

    // 2 knights
    this.pawns.push(new Knight({ x: 2, y: reverteY(isFirst, 1) }, isFirst));
    this.pawns.push(new Knight({ x: 7, y: reverteY(isFirst, 1) }, isFirst));

    // 2 bishops
    this.pawns.push(new Bishop({ x: 3, y: reverteY(isFirst, 1) }, isFirst));
    this.pawns.push(new Bishop({ x: 6, y: reverteY(isFirst, 1) }, isFirst));

    // 1 queen
    this.pawns.push(new Queen({ x: 4, y: reverteY(isFirst, 1) }, isFirst));

    // 1 king
    this.pawns.push(new King({ x: 5, y: reverteY(isFirst, 1) }, isFirst));
  }
}

export class Chess {
  public board: BoardSquare[][] = [];
  public isWhitePlaying = true;

  private whitePlayer = new Player(true);
  private blackPlayer = new Player();

  get currentPlayer() {
    return this.isWhitePlaying ? this.whitePlayer : this.blackPlayer;
  }

  constructor(private htmlElement: HTMLDivElement) {
    this.syncBoard();
  }

  public getPosition(position: BoardPosition): BoardSquare {
    validatePosition(position);
    return this.board[SIZE - position.y][position.x - 1];
  }

  public setPosition(position: BoardPosition, value: BoardSquare): void {
    validatePosition(position);
    this.board[SIZE - position.y][position.x - 1] = value;
  }

  public getAllSquaresElement(): HTMLDivElement[] {
    const [boardEl] = Array.from(this.htmlElement.children);

    const rows = Array.from(boardEl.children)
      // remove the first x row
      .slice(1)
      .map((row) => {
        const childs = Array.from(row.children);
        // remove the first y square
        return childs.slice(1);
      });

    return rows.flat() as HTMLDivElement[];
  }

  public syncBoard(): void {
    this.resetBoard();
    this.syncPlayer(this.whitePlayer);
    this.syncPlayer(this.blackPlayer);
  }

  private resetBoard() {
    this.board = new Array<BoardSquare>(SIZE)
      .fill({ symbol: SquareSymbol.EMPTY })
      .map(() =>
        new Array<BoardSquare>(SIZE).fill({ symbol: SquareSymbol.EMPTY })
      );
  }

  private syncPlayer(player: Player): void {
    player.pawns.forEach((pawn) => {
      this.setPosition(pawn.position, {
        symbol: pawn.id,
        pawn: pawn,
      });
    });
  }
}
