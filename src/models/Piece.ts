import {Position} from "./Position";
import {PieceType, Sides} from "../Types";

// piece class
export class Piece {

    image: string;
    position : Position
    type: PieceType;
    side : Sides;
    possibleMoves? : Position[];
    hasMoved : boolean;
    constructor(position: Position, type: PieceType, side: Sides, hasMoved: boolean, possibleMoves: Position[] = []) {
        this.image = `assets/images/${side}${type}.svg`;
        this.position = position;
        this.type = type;
        this.side = side;
        this.possibleMoves = possibleMoves;
        this.hasMoved = false;
    }

    // methods to check piece type
    get isPawn() : boolean{
        return this.type === PieceType.PAWN;
    }
    get isRook() : boolean{
        return this.type === PieceType.ROOK;
    }
    get isKing() : boolean{
        return this.type === PieceType.KING;
    }

    // methods to check piece position
    samePiecePosition(otherPiece: Piece): boolean{
        return this.position.samePosition(otherPiece.position);
    }

    // methods to check position
    samePosition(otherPosition: Position): boolean{
        return this.position.samePosition(otherPosition);
    }

    // clone method for piece
    clone(): Piece {
        return new Piece(this.position.clone(), this.type, this.side, this.hasMoved, this.possibleMoves?.map(m => m.clone()));
    }



}