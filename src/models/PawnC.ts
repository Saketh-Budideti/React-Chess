import {Piece} from "./Piece";
import {PieceType, Sides} from "../Types";
import {Position} from "./Position";

export class PawnC extends Piece{

    enPassant? : boolean;

    constructor(position: Position, side: Sides, hasMoved: boolean, enPassant?: boolean, possibleMoves: Position[] = []) {
        super(position, PieceType.PAWN, side, hasMoved, possibleMoves);
        this.enPassant = enPassant;
    }

    clone(): PawnC {
        return new PawnC(this.position.clone(), this.side, this.hasMoved, this.enPassant, this.possibleMoves?.map(m => m.clone()))
    }
}