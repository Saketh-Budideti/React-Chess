import {isFreeOrOccByOpp, isOccupied, isOccupiedbyOpponent} from "./States";
import {Piece, Position} from "../../models";
import {Sides} from "../../Types";

export const bishopMove = (initialPos: Position, desiredPos: Position, side: Sides, boardState: Piece[]) => {
    for (let i = 1; i < 8; i++) {
        let dirY = (initialPos.y < desiredPos.y) ? 1 : -1;
        let dirX = (initialPos.x < desiredPos.x) ? 1 : -1;
        let passedPosition: Position = new Position(initialPos.x + (i * dirX), initialPos.y + (i * dirY));
        if (isFreeOrOccByOpp(passedPosition, boardState, side) && passedPosition.samePosition(desiredPos)) {
            return true;
        } else {
            if (isOccupied(passedPosition, boardState)) {
                break;
            }
        }
    }
    return false;

}

export const getPossibleBishopMoves = (piece: Piece, boardState: Piece[]) : Position[] => {
    const possibleMoves: Position[] = [];



    for(let i = 1; i < 8; i++) {
        const destination= new Position(piece.position.x + i, piece.position.y + i) ;

        if(!isOccupied(destination, boardState)) {
            possibleMoves.push(destination);
        } else if(isOccupiedbyOpponent(destination, boardState, piece.side)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // Bottom right movement
    for(let i = 1; i < 8; i++) {
        const destination= new Position(piece.position.x + i, piece.position.y - i);

        if(!isOccupied(destination, boardState)) {
            possibleMoves.push(destination);
        } else if(isOccupiedbyOpponent(destination, boardState, piece.side)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // Bottom left movement
    for(let i = 1; i < 8; i++) {
        const destination= new Position(piece.position.x - i, piece.position.y - i);

        if(!isOccupied(destination, boardState)) {
            possibleMoves.push(destination);
        } else if(isOccupiedbyOpponent(destination, boardState, piece.side)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // Top left movement
    for(let i = 1; i < 8; i++) {
        const destination= new Position(piece.position.x - i, piece.position.y + i);

        if(!isOccupied(destination, boardState)) {
            possibleMoves.push(destination);
        } else if(isOccupiedbyOpponent(destination, boardState, piece.side)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    return possibleMoves;
}
