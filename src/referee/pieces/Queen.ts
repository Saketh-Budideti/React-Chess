import {isFreeOrOccByOpp, isOccupied, isOccupiedbyOpponent} from "./States";
import {Piece, Position} from "../../models";
import {Sides} from "../../Types";


// logic to find all possible queen moves
export const getPossibleQueenMoves = (piece: Piece, boardState: Piece[]) : Position[] => {
    const possibleMoves: Position[] = [];

    // Top movement
    for(let i = 1; i < 8; i++) {
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

    for(let i = 1; i < 8; i++) {
        const destination = new Position(piece.position.x + i, piece.position.y + i);

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
        const destination = new Position(piece.position.x + i, piece.position.y - i);

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
        const destination = new Position(piece.position.x - i, piece.position.y - i);

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
        const destination = new Position(piece.position.x - i, piece.position.y + i);

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