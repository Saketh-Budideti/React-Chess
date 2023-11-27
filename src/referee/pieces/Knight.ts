import {isFreeOrOccByOpp, isOccupied, isOccupiedbyOpponent} from "./States";
import {Piece, Position} from "../../models";
import {Sides} from "../../Types";



// logic to find all possible knight moves
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