import {
  BasePawn,
  BoardPosition,
  BoardSquare,
  SIZE,
  SquareSymbol,
} from "./types";

export class Pawn implements BasePawn {
  public id: SquareSymbol = SquareSymbol.PAWN;
  public availablePositions = () => [];

  constructor(public position: BoardPosition) {}
}

class King extends Pawn {
  public id = SquareSymbol.KING;
  public availablePositions = () => [];
}

class Queen extends Pawn {
  public id = SquareSymbol.QUEEN;
  public availablePositions = () => [];
}

class Rook extends Pawn {
  public id = SquareSymbol.ROOK;
  public availablePositions = () => [];
}

class Bishop extends Pawn {
  public id = SquareSymbol.BISHOP;
  public availablePositions = () => [];
}

class Knight extends Pawn {
  public id = SquareSymbol.KNIGHT;
  public availablePositions = () => [];
}

class Player {
  pawns: Pawn[] = new Array(SIZE * 2);

  constructor(isFirst = false) {
    this.initPawns(isFirst);
  }

  private initPawns(isFirst = false): void {
    const yDelta = SIZE + 1;

    const calculateY = (isFirst: boolean, value: number) =>
      isFirst ? value : yDelta - value;

    // 8 pawns
    for (let i = 0; i < SIZE; i++) {
      this.pawns.push(new Pawn({ x: i + 1, y: calculateY(isFirst, 2) }));
    }

    // 2 rooks
    this.pawns.push(new Rook({ x: 1, y: calculateY(isFirst, 1) }));
    this.pawns.push(new Rook({ x: 8, y: calculateY(isFirst, 1) }));

    // 2 knights
    this.pawns.push(new Knight({ x: 2, y: calculateY(isFirst, 1) }));
    this.pawns.push(new Knight({ x: 7, y: calculateY(isFirst, 1) }));

    // 2 bishops
    this.pawns.push(new Bishop({ x: 3, y: calculateY(isFirst, 1) }));
    this.pawns.push(new Bishop({ x: 6, y: calculateY(isFirst, 1) }));

    // 1 queen
    this.pawns.push(new Queen({ x: 4, y: calculateY(isFirst, 1) }));

    // 1 king
    this.pawns.push(new King({ x: 5, y: calculateY(isFirst, 1) }));
  }
}

export class Chess {
  public board = new Array<BoardSquare>(SIZE)
    .fill({ symbol: SquareSymbol.EMPTY })
    .map(() =>
      new Array<BoardSquare>(SIZE).fill({ symbol: SquareSymbol.EMPTY })
    );

  private whitePlayer = new Player(true);
  private blackPlayer = new Player();

  constructor() {
    this.initBoard();
  }

  public getPosition(position: BoardPosition): BoardSquare {
    this.validatePosition(position);
    return this.board[SIZE - position.y][position.x - 1];
  }

  public setPosition(position: BoardPosition, value: BoardSquare): void {
    this.validatePosition(position);
    this.board[SIZE - position.y][position.x - 1] = value;
  }

  private validatePosition({ x, y }: BoardPosition): boolean {
    if (x > SIZE || x <= 0 || y > SIZE || y <= 0) {
      throw new Error(`wrong position x:${x} y:${y}`);
    }

    return true;
  }

  private initBoard(): void {
    this.initPlayer(this.whitePlayer, true);
    this.initPlayer(this.blackPlayer);
  }

  private initPlayer(player: Player, whitePlayer = false): void {
    player.pawns.forEach((pawn) => {
      this.setPosition(pawn.position, {
        symbol: pawn.id,
        pawn: { ...pawn, belongsToWhitePlayer: whitePlayer },
      });
    });
  }
}
