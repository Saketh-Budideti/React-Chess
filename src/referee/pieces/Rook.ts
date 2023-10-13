import {isOccupied, isFreeOrOccByOpp, isOccupiedbyOpponent} from "./States";
import {Piece, Position} from "../../models";
import {Sides} from "../../Types";

export const rookMove = (initialPos: Position, desiredPos: Position, side: Sides, boardState: Piece[]) => {
    for (let i = 1; i < 8; i++) {
        let dirX = (initialPos.x > desiredPos.x) ? -1 : (initialPos.x < desiredPos.x) ? 1 : 0;
        let dirY = (initialPos.y > desiredPos.y) ? -1 : (initialPos.y < desiredPos.y) ? 1 : 0;
        let passedPosition = new Position(initialPos.x + (i * dirX), initialPos.y + (i * dirY));

        if (isFreeOrOccByOpp(passedPosition, boardState, side) && passedPosition.samePosition(desiredPos) && (dirX === 0 ||  dirY === 0)) {
            return true;
        } else {
            if (isOccupied(passedPosition, boardState)) {
                break;
            }
        }
    }
    return false;
}


export const getPossibleRookMoves = (piece: Piece, boardState: Piece[]) : Position[] => {
    const possibleMoves: Position[] = [];

    // Top movement
    for(let i = 1; i < 8; i++) {
        if(piece.position.y + i > 7){
            break;
        }

        const destination = new Position(piece.position.x, piece.position.y + i);

        if(!isOccupied(destination, boardState)) {
            possibleMoves.push(destination);
        } else if(isOccupiedbyOpponent(destination, boardState, piece.side)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // Bottom movement
    for(let i = 1; i < 8; i++) {
        if(piece.position.y - i < 0){
            break;
        }

        const destination = new Position(piece.position.x, piece.position.y - i);

        if(!isOccupied(destination, boardState)) {
            possibleMoves.push(destination);
        } else if(isOccupiedbyOpponent(destination, boardState, piece.side)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // Left movement
    for(let i = 1; i < 8; i++) {
        if(piece.position.x - i < 0){
            break;
        }
        const destination = new Position(piece.position.x - i, piece.position.y);

        if(!isOccupied(destination, boardState)) {
            possibleMoves.push(destination);
        } else if(isOccupiedbyOpponent(destination, boardState, piece.side)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // Right movement
    for(let i = 1; i < 8; i++) {
        if(piece.position.x + i > 7){
            break;
        }

        const destination = new Position(piece.position.x + i, piece.position.y);

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