import {isFreeOrOccByOpp, isOccupied, isOccupiedbyOpponent} from "./States";
import {Piece, Position} from "../../models";
import {Sides} from "../../Types";


export const knightMove = (initialPos: Position, desiredPos: Position, side: Sides, boardState: Piece[]): boolean => {
    if ((Math.abs(desiredPos.x - initialPos.x) === 1 && Math.abs(desiredPos.y - initialPos.y) === 2) ||
        (Math.abs(desiredPos.y - initialPos.y) === 1 && Math.abs(desiredPos.x - initialPos.x) === 2)) {
        if (isFreeOrOccByOpp(desiredPos, boardState, side)) {
            return true;
        }
    }
    return false;
}

export const getPossibleKnightMoves = (piece: Piece, boardState: Piece[]) : Position[] => {


    const possibleMoves: Position[] = [];

    for(let i = -1; i < 2; i += 2){
        for(let j = -1; j < 2; j += 2){
            const verticalMove = new Position(piece.position.x + j, piece.position.y + i * 2);
            const horizontalMove = new Position(piece.position.x + j * 2, piece.position.y + i);


            if(isFreeOrOccByOpp(verticalMove, boardState, piece.side)){
                possibleMoves.push(verticalMove);
            }

            if(isFreeOrOccByOpp(horizontalMove, boardState, piece.side)){
                possibleMoves.push(horizontalMove);
            }
        }
    }



    return possibleMoves;
}