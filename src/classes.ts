import { BasePawn, SquareSymbol, BoardPosition, SIZE } from "./types";

class Pawn implements BasePawn {
  id: SquareSymbol = SquareSymbol.PAWN;
  availablePositions = () => [];

  constructor(public position: BoardPosition) {}
}

class King extends Pawn {
  id = SquareSymbol.KING;
  availablePositions = () => [];
}

class Queen extends Pawn {
  id = SquareSymbol.QUEEN;
  availablePositions = () => [];
}

class Rook extends Pawn {
  id = SquareSymbol.ROOK;
  availablePositions = () => [];
}

class Bishop extends Pawn {
  id = SquareSymbol.BISHOP;
  availablePositions = () => [];
}

class Knight extends Pawn {
  id = SquareSymbol.KNIGHT;
  availablePositions = () => [];
}

class Player {
  pawns: Pawn[] = new Array(SIZE * 2);

  constructor(isFirst = false) {
    this.initPawns(isFirst);
  }

  private initPawns(isFirst = false) {
    const yDelta = SIZE + 1;

    // 8 pawns
    for (let i = 0; i < SIZE; i++) {
      this.pawns.push(new Pawn({ x: i + 1, y: isFirst ? 2 : yDelta - 2 }));
    }

    // 2 rooks
    this.pawns.push(new Rook({ x: 1, y: isFirst ? 1 : yDelta - 1 }));
    this.pawns.push(new Rook({ x: 8, y: isFirst ? 1 : yDelta - 1 }));

    // 2 knights
    this.pawns.push(new Knight({ x: 2, y: isFirst ? 1 : yDelta - 1 }));
    this.pawns.push(new Knight({ x: 7, y: isFirst ? 1 : yDelta - 1 }));

    // 2 bishops
    this.pawns.push(new Bishop({ x: 3, y: isFirst ? 1 : yDelta - 1 }));
    this.pawns.push(new Bishop({ x: 6, y: isFirst ? 1 : yDelta - 1 }));

    // 1 queen
    this.pawns.push(new Queen({ x: 4, y: isFirst ? 1 : yDelta - 1 }));

    // 1 king
    this.pawns.push(new King({ x: 5, y: isFirst ? 1 : yDelta - 1 }));
  }
}

export class Chess {
  public board = new Array<SquareSymbol>(SIZE)
    .fill(SquareSymbol.EMPTY)
    .map(() => new Array<SquareSymbol>(SIZE).fill(SquareSymbol.EMPTY));

  private whitePlayer = new Player(true);
  private blackPlayer = new Player();

  constructor() {
    this.initBoard();
  }

  public getPosition(position: BoardPosition) {
    this.validatePosition(position);
    return this.board[SIZE - position.y][position.x - 1];
  }

  public setPosition(position: BoardPosition, value: SquareSymbol) {
    this.validatePosition(position);
    return (this.board[SIZE - position.y][position.x - 1] = value);
  }

  private validatePosition({ x, y }: BoardPosition) {
    if (x > SIZE || x <= 0 || y > SIZE || y <= 0) {
      throw new Error(`wrong position x:${x} y:${y}`);
    }

    return true;
  }

  private initBoard() {
    this.initPlayer(this.whitePlayer);
    this.initPlayer(this.blackPlayer);
  }

  private initPlayer(player: Player) {
    player.pawns.forEach(({ position, id }) => {
      this.setPosition(position, id);
    });
  }
}
