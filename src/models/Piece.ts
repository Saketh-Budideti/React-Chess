import {Position} from "./Position";
import {PieceType, Sides} from "../Types";

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

    get isPawn() : boolean{
        return this.type === PieceType.PAWN;
    }
    get isKnight() : boolean{
        return this.type === PieceType.KNIGHT;
    }
    get isBishop() : boolean{
        return this.type === PieceType.BISHOP;
    }
    get isRook() : boolean{
        return this.type === PieceType.ROOK;
    }
    get isQueen() : boolean{
        return this.type === PieceType.QUEEN;
    }
    get isKing() : boolean{
        return this.type === PieceType.KING;
    }




    samePiecePosition(otherPiece: Piece): boolean{
        return this.position.samePosition(otherPiece.position);
    }

    samePosition(otherPosition: Position): boolean{
        return this.position.samePosition(otherPosition);
    }


    clone(): Piece {
        return new Piece(this.position.clone(), this.type, this.side, this.hasMoved, this.possibleMoves?.map(m => m.clone()));
    }



}