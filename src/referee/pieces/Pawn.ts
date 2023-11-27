import {isOccupied, isOccupiedbyOpponent} from "./States"
import {Piece, Position} from "../../models";
import {PieceType, Sides} from "../../Types";
import {PawnC} from "../../models/PawnC";

// logic to find all possible pawn moves
export const getPossiblePawnMoves = (piece: Piece, boardState: Piece[]) : Position[] => {

    const possibleMoves: Position[] = [];

    const direction = (piece.side === Sides.PLAYER) ? 1 : -1;
    const specialRow = (piece.side === Sides.PLAYER) ? 1 : 6;


    const normalMove = new Position(piece.position.x, piece.position.y + direction);
    const upperLeftAttack = new Position(piece.position.x - 1, piece.position.y + direction);
    const upperRightAttack = new Position(piece.position.x + 1, piece.position.y + direction);
    const leftPosition = new Position(piece.position.x - 1, piece.position.y);
    const rightPosition = new Position(piece.position.x + 1, piece.position.y);


    if(!isOccupied(new Position(piece.position.x, piece.position.y + direction), boardState)){
        possibleMoves.push(new Position(piece.position.x, piece.position.y + direction));

        if(piece.position.y === specialRow && !isOccupied(new Position(piece.position.x, piece.position.y + direction * 2), boardState)){
            possibleMoves.push(new Position(piece.position.x, piece.position.y + 2 * direction));
        }
    }

    if(isOccupiedbyOpponent(upperLeftAttack, boardState, piece.side)){
        possibleMoves.push(upperLeftAttack);
    } else if(!isOccupied(upperLeftAttack, boardState)){
        const leftPiece = boardState.find(p => p.samePosition(leftPosition));
        if(leftPiece != null && (leftPiece as PawnC).enPassant) {
            possibleMoves.push(upperLeftAttack);
        }
    }
    if(isOccupiedbyOpponent(upperRightAttack, boardState, piece.side)) {
        possibleMoves.push(upperRightAttack);
    } else if(!isOccupied(upperRightAttack, boardState)) {
        const rightPiece = boardState.find(p => p.samePosition(rightPosition));
        if (rightPiece != null && (rightPiece as PawnC).enPassant) {
            possibleMoves.push(upperRightAttack);

        }
    }
        return possibleMoves;
}

