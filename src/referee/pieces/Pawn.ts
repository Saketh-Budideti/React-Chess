import {isOccupied, isOccupiedbyOpponent} from "./States"
import {Piece, Position} from "../../models";
import {PieceType, Sides} from "../../Types";
import {PawnC} from "../../models/PawnC";


export const pawnMove = (initialPos: Position, desiredPos: Position, side: Sides, boardState: Piece[]): boolean => {
    //movement
    const startingRow = (side === Sides.PLAYER) ? 1 : 6;
    const direction = (side === Sides.PLAYER) ? 1 : -1;

    if (initialPos.x === desiredPos.x) {
        if (initialPos.y === startingRow && (desiredPos.y - initialPos.y) === direction * 2) {
            if (!isOccupied(desiredPos, boardState) && (!isOccupied(new Position(desiredPos.x, desiredPos.y - direction)
                , boardState))) {
                return true;
            }
        } else if (desiredPos.y - initialPos.y === direction) {
            if (!isOccupied(desiredPos, boardState)) {
                return true;
            }
        }
    }
    //capture
    else if (Math.abs(desiredPos.x - initialPos.x) === 1 && (desiredPos.y - initialPos.y) === direction) {
        if (isOccupiedbyOpponent(desiredPos, boardState, side)) {
            return true;
        }
    }
    return false;
}

export const getPossiblePawnMoves = (piece: Piece, boardState: Piece[]) : Position[] => {

    const possibleMoves: Position[] = [];

    const direction = (piece.side === Sides.PLAYER) ? 1 : -1;
    const specialRow = (piece.side === Sides.PLAYER) ? 1 : 6;

    // for(let i = 0; i < 8; i++){
    //     for(let j = 0; j < 8; j++){
    //         if(pawnMove(initialPos, {x: i, y: j}, piece.side, boardState)){
    //             possibleMoves.push({x: i, y: j});
    //         }
    //     }
    // }

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

